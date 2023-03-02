export default class ContextStrategy {
  constructor(dbStrategy) {
    this.dbStrategy = dbStrategy
  }

  async connect() {
    this.dbStrategy.connect()
  }
  async create(data) {
    return this.dbStrategy.create(data)
  }
  async read(data) {
    return this.dbStrategy.read(data)
  }
}
