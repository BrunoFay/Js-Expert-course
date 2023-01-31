import { writeFile, readFile } from 'fs/promises'

export const save = async (data) => {
  const { pathname: dbFilePath } = new URL("./../database.json", import.meta.url)

  const currentData = JSON.parse((await readFile(dbFilePath)))
  currentData.push(data)

  await writeFile(dbFilePath, JSON.stringify(currentData))
}
