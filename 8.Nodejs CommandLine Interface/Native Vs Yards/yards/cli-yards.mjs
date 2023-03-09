#!usr/bin/env node
/* make this fila an executable  chmod +x cli-yargs.mjs*/
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })
const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a hero', (builder) => {
    return builder
      .option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'hero name',
        type: 'string'
      })
      .option('age', {
        alias: 'a',
        demandOption: true,
        describe: 'hero age',
        type: 'number'
      })
      .option('power', {
        alias: 'p',
        demandOption: true,
        describe: 'hero power',
        type: 'string'
      })
      .example('createHero --name hulk --age 32 --power indestructible')
      .example('createHero --n black panther --a 42 --power wakanda forever')
  })

console.log(hero(argv))
