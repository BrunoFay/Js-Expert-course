import fs from 'fs'
import fsPromises from 'fs/promises'
import templates from './templates/index.js'
import Util from './util.js'

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [
      `${componentName}Repository`,
      `${componentName}Service`,
    ]
  }
  /*this map serves to force the files to be created with lowercase letter  */
  return dependencies[layer].map(Util.lowerCaseFirstLatter)
}

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(pendingFilesToWrite.map((
    ({ fileName, txtFile }) => fsPromises.writeFile({ fileName, txtFile })
  ))
  )
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {

  const keys = Object.keys(templates)
  const pendingFilesToWrite = []
  for (const layer of layers) {
    /* will navigate through the sent layers and compare if it exists within the array of templates */
    const chosenTemplate = keys.find(key => key.includes(layer))
    if (!chosenTemplate) {
      return { error: 'the chosen layer doenst have a template' }
    }

    const template = templates[chosenTemplate]
    /*  path exemple /Users/Document/JsExpert/codegen/src/factory*/
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`

    const dependencies = defaultDependencies(layer, componentName)
    const { fileName, template: txtFile } = template(componentName, ...dependencies)

    const fileNamePath = `${targetFolder}/${Util.lowerCaseFirstLatter(fileName)}.js`
    /* path exemple  /Users/Document/JsExpert/codegen/src/factory/heroesFactory.js*/
    pendingFilesToWrite.push({ fileName: fileNamePath, txtFile })
  }
  await executeWrites(pendingFilesToWrite)

  return { success: true }
}
