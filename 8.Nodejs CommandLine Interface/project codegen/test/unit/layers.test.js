import { beforeEach, jest, describe, expect, test } from '@jest/globals'
import { createLayersIfNotExists } from '../../src/createLayers.js'
import fs from 'fs'
import fsPromises from 'fs/promises'

describe('#Layers - Folder Structure', () => {
  const defaultLayers = ['service', 'factory', 'repository']
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('should create folders if it doesnt exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false)

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
  })

  test('should not create folders if it  exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true)

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).not.toHaveBeenCalledTimes(defaultLayers.length)
  })

})
