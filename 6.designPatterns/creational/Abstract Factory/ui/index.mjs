import { database } from '../shared/data.mjs'

class Application {
  constructor(factory) {
    this.table = factory.createTable()
  }

  initialize(database) {
    this.table.render(database)
  }
}

; (async function main() {
  /* how to check current app */
  const path = globalThis.window ? 'browser' : 'console'
  const { default: ViewFactory } = await import(`./../platforms/${path}/index.mjs`)
  const app = new Application(new ViewFactory())
  app.initialize(database)

})()
