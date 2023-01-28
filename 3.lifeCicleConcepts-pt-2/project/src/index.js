import db from './../database.json' assert { type: 'json' }
import Person from './person.js'
import TerminalController from './terminalController.js'


const DEFAULT_LANGUAGE = 'pt-br'
const STOP_TERMINAL_TERM = 'exit'
const terminalController = new TerminalController()

terminalController.initializeTerminal(db, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question('ola ')
    console.log("answer", answer)
    if (answer === STOP_TERMINAL_TERM) {
      terminalController.closeTerminal()
      return
    }
    const person = Person.generateInstanceFromString(answer)
    console.log(person.formatted(DEFAULT_LANGUAGE));
    mainLoop()
  } catch (error) {

  }
}

await mainLoop()
