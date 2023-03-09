const { existsSync, mkdirSync, rmSync } = require('fs')
const { execSync } = require('child_process')

/* recursive serve para excluir a pasta mesmo se houver arquivos dentro */
const rmFolder = folderName => rmSync(`./${folderName}`, { recursive: true })

const getFileName = (index) => index >= 3 ? `js-0${index}` : `mjs-0${index}`

const makeDirAndReturnName = (folderName) => {
  if (existsSync(folderName)) rmFolder(folderName)
  mkdirSync(folderName)
  return folderName
}

const initializePackage = folderName => {
  /* execSync ta sendo usado para rodar um comando shell. (é necessario passar um path cwd) */
  execSync(`npm init -y --scope @brunofay --silent`, {
    cwd: `./${folderName}`
  })
  return folderName
}

const PrintNameAndPackageVersion = folderName => {
  const { name, version } = require(`./${folderName}/package.json`)
  console.log({ n: name, v: version })
  return folderName
}
const FOLDER_AMOUNT = 4
Array.from(Array(FOLDER_AMOUNT).keys())
  .map(index => makeDirAndReturnName(getFileName(index + 1)))
  .map(folderName => initializePackage(folderName))
  .map(folderName => PrintNameAndPackageVersion(folderName))
  .map(folderName => rmFolder(folderName))
