import { beforeAll, beforeEach, jest, describe, expect, test, afterAll } from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from '../../src/createLayers.js'
import { createFiles } from '../../src/createFiles.js'
import Util from '../../src/util.js'


function getAllFunctionsFromInstance(instance) {
  /* way to get method names inside a class */
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(method => method !== 'constructor')
}

function generateFilePath({ mainPath, defaultMainFolder, componentName, layers }) {
  return layers.map((layer) => {
    const fileName = `${componentName}${Util.upperCaseFirstLatter(layer)}.js`
    /*
      mainPath: /Documents/Projects/jsExpert
      defaultMainFolder: src
      layer: factory
      fileName: animalsFactory.js
    */
    return join(mainPath, defaultMainFolder, layer, fileName)
  })
}

describe('#Integration - Files - Files Structure', () => {
  const config = {
    mainPath: '',
    defaultMainFolder: 'src',
    /* sort is necessary because sytem return in alphabetic order */
    layers: ['service', 'factory', 'repository'].sort(),
    componentName: 'animals'
  }

  /* the location is created by hand via the relative path of the package.json, so that it does not get the package from the root of the project */
  const packageJsonName = 'package.json'
  const packageJsonLocation = join('./test/integration/mocks', packageJsonName)

  beforeAll(async () => {
    /* create a temporary dir if tmpdir  */
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
    await fsPromises.copyFile(packageJsonLocation, join(config.mainPath, packageJsonName))
    await createLayersIfNotExists(config)
  })

  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    /* remove temporary dir  */
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  test('Repository class should have create, read, update and delete methods', async () => {
    const myConfig = { ...config, layers: ['repository'] }

    await createFiles(myConfig)
    const [repositoryFile] = generateFilePath(myConfig)
    /* validate if is an js code */
    const { default: Repository } = await import(repositoryFile)
    const instance = new Repository()
    const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual("method not implemented!")

    expectNotImplemented(instance.create)
    expectNotImplemented(instance.read)
    expectNotImplemented(instance.update)
    expectNotImplemented(instance.delete)
  })

  test('Service class should have create, read, update and delete methods ', async () => {
    const myConfig = { ...config, layers: ['repository', 'service'] }

    await createFiles(myConfig)
    const [repositoryFile, serviceFile] = generateFilePath(myConfig)
    /* validate if is an js code */
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)

    const repository = new Repository()
    const service = new Service({ repository })
    const allRepositoryMethods = getAllFunctionsFromInstance(repository)

    allRepositoryMethods.forEach((method) => jest.spyOn(repository, method).mockResolvedValue())
    /* exec all services methods  */
    getAllFunctionsFromInstance(service).forEach((method) => service[method].call(service, []))

    allRepositoryMethods.forEach((method) => expect(repository[method]).toHaveBeenCalled())

  })
  test('Factory class should have create, read, update and delete methods and match instance layers', async () => {
    const myConfig = { ...config }
    await createFiles(myConfig)
    /* factory first because of sort in layers */
    const [factoryFile, repositoryFile, serviceFile] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)
    const { default: Factory } = await import(factoryFile)

    const expectedInstance = new Service({ repository: new Repository() })
    const instance = Factory.getInstance()

    expect(instance).toMatchObject(expectedInstance)

  })

})
