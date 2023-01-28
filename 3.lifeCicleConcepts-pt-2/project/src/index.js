import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import db from './../database.json' assert {type: 'json'}
import Person from './person.js'
import readline from 'readline'
/* initialize */
DraftLog(console).addLineListener(process.stdin)

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyanBright("ID") },
    { field: "vehicles", name: chalk.redBright("Vehicles") },
    { field: "kmTraveled", name: chalk.magentaBright("Km Traveled") },
    { field: "from", name: chalk.yellowBright("From") },
    { field: "to", name: chalk.blueBright("To") },
  ]
}

const table = chalkTable(options, db.map(item => new Person(item).formatted('pt-br')))
const print = console.draft(table)

const terminal = readline.createInterface({ input: process.stdin, output: process.stdout })

terminal.question('Qual é o seu nome?', msg => {
  console.log('msg',msg.toString())
})
