import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'
import readline from 'readline'
import Person from './person.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
  }

  initializeTerminal(db, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({ input: process.stdin, output: process.stdout })
    this.initializeTable(db, language)
  }

  initializeTable(db, language) {
    const data = db.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), data)
    this.print = console.draft(table)
    this.data = data

  }

  updateTable(item){
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(),this.data))
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))

  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyanBright("ID") },
        { field: "vehicles", name: chalk.redBright("Vehicles") },
        { field: "kmTraveled", name: chalk.magentaBright("Km Traveled") },
        { field: "from", name: chalk.yellowBright("From") },
        { field: "to", name: chalk.blueBright("To") },
      ]
    }
  }
}

