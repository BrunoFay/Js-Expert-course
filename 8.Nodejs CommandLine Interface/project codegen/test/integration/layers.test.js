import { beforeAll, beforeEach, jest, describe, expect, test, afterAll } from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from '../../src/createLayers.js'


function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir((join(mainPath, defaultMainFolder)))
}
describe('#Integration - Layers - Folder Structure', () => {
  let tmpDir = ''
  const config = {
    mainPath: '',
    defaultMainFolder: 'src',
    /* sort is necessary because sytem return in alphabetic order */
    layers: ['service', 'factory', 'repository'].sort()
  }
  beforeAll(async () => {
    /* create a temporary dir if tmpdir  */
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
  })

  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    /* remove temporary dir  */
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  test('should not create folders if it exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)
    /* run  */

    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)
    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)

  })

  test('should not create folders if it  exists', async () => {
    const beforeRun = await getFolders(config)

    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)
    expect(afterRun).toEqual(beforeRun)

  })

})
