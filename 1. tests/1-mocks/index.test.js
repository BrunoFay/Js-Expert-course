const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects,deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = require('./mocks/empty-itens-invalid.csv')
    const rejection = new  Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result,rejection)
  }
  {
    const filePath = require('./mocks/4-itens-invalid.csv')
    const rejection = new  Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result,rejection)
  }
  {
    const filePath = require('./mocks/3-itens-valid.csv')
    const result = File.csvToJson(filePath)
    const expected = [
      {
        "id": 123,
        "name": "bruno",
        "profession": "front-end dev",
        "age": 1996
      },
      {
        "id": 142,
        "name": "james",
        "profession": "back-end dev",
        "age": 2003
      },
      {
        "id": 134,
        "name": "lizz",
        "profession": "ux designer",
        "age": 1984
      }
    ]
    deepStrictEqual(JSON.stringify(result),JSON.stringify(expected))
  }
})()