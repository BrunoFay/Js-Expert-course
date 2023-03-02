import { MongoClient } from 'mongodb'
export default class MongoDBStrategy {
  #instance
  constructor(connectionString) {
    const { pathname: dbName } = new URL(connectionString)
    this.connectionString = connectionString.replace(dbName, '')
    this.db = dbName.replace(/\W/, '')
    this.collection = "warriors"
  }

  async connect() {
    const client = new MongoClient(this.connectionString)
    await client.connect()
    const db = client.db(this.db).collection(this.collection)
    this.#instance = db
    return this.#instance
  }
  async create(data) {
    if (!this.#instance) {
      await this.connect();
    }
    return this.#instance.insertOne(data);
  }
  async read(data) {
    return this.#instance.find(data).toArray()
  }
}
