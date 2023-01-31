import db from './../database.json' assert { type: 'json' }
import Person from './person.js'
import { save } from './repository.js'
import TerminalController from './terminalController.js'

const DEFAULT_LANGUAGE = 'pt-br'
const STOP_TERMINAL_TERM = 'exit'
const terminalController = new TerminalController()

terminalController.initializeTerminal(db, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    console.log("answer", answer)
    if (answer === STOP_TERMINAL_TERM) {
      terminalController.closeTerminal()
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
    await save(person)

   return mainLoop()
  } catch (error) {
      console.error('DEU RUIM',error)
  }
}

await mainLoop()
