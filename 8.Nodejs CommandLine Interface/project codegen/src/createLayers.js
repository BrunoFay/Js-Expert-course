import fs from 'fs'
import fsPromises from 'fs/promises'

export async function createLayersIfNotExists({ mainPath, defaultMainFolder, layers }) {
  const defaultPath = `${mainPath}/${defaultMainFolder}`
  /* will return all names of folders not created */
  const foldersToCreate = layers.filter(layer => !fs.existsSync(layer))
  /* recursive will create all folders, like command mkdir -p -folder- */
  const results = foldersToCreate.map(folder => fsPromises.mkdir(`${defaultPath}/${folder}`, { recursive: true }))

  return Promise.all(results)
}
