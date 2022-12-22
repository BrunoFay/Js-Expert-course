const {readFile} = require('fs/promises')
const {error} = require('./constants')
const User = require('./user');

const DEFAULT_OPTIONS = {
  maxLength: 3,
  fields:["id","name","profession","age"]
}

class File {
  static async csvToJson(filePath){
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)
    if (!validation.valid) throw new Error(validation.error)

    const users = File.parseCSVToJSON(content)
    return users
  }

  static async getFileContent(filePath){
    return await ((await readFile(filePath)).toString('utf8'))
  }

  static isValid(csvString,options = DEFAULT_OPTIONS){
    const [header, ...fileWithoutHeader]= csvString.split('\n')
    const isValidHeader = header === options.fields.join(',')
    if(!isValidHeader){
      return {
        error:error.FILE_FIELDS_ERROR_MESSAGE,
        valid:false
      }
    }

    const isContentLengthAccept = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLength
    )

    if(!isContentLengthAccept){
      return {
        error:error.FILE_LENGTH_ERROR_MESSAGE,
        valid:false
      }
    }

    return {valid:true}
  }

  static parseCSVToJSON(csvString){
    const lines = csvString.split('\n')

    //get headers from csv ( first line)
    const firstLine= lines.shift()
    const header = firstLine.split(',')

    const users = lines.map(line=>{
      let user = {}

      const columns = line.split(',')

      for(const i in columns){
        user[header[i]]=columns[i]
      }
      return new User(user)
    })

    return users
  }
}

(async ()=> {
/*   const result = await File.csvToJson('./../mocks/3-itens-valid.csv')*/
 const result = await File.csvToJson('./../mocks/itens-with-invalid-headers.csv')
  console.log('result:', result)
})()

module.exports = File