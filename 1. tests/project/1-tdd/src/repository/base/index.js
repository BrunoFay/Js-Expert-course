const { readFile } = require('fs/promises');


class BaseRepository {
  constructor({ file }) {
    this.file = file
  }
  async find(fileId) {
    const content = JSON.parse(await readFile(this.file))

    if (!fileId) return content

    return content.find(({ id }) => id === fileId)
  }
}

module.exports = BaseRepository