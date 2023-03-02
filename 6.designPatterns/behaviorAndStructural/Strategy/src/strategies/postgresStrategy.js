import knex from 'knex';

export default class PostgresStrategy {
  #instance;
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.table = 'warriors';
  }

  async connect() {
    try {
      this.#instance = knex({
        client: 'pg',
        connection: this.connectionString,
      });

      await this.#instance.raw('select 1+1 as result');
    } catch (error) {
      console.error(error);
    }

    return this.#instance;
  }

  async create(data) {
    return this.#instance(this.table).insert(data);
  }

  async read() {
    return this.#instance(this.table).select('*');
  }
}
