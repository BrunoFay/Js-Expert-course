#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createLayersIfNotExists } from "./createLayers.js";
import { createFiles } from "./createFiles.js";

const { argv: { componentName } } = yargs(hideBin(process.argv))
  .command('Skeleton', 'Generate a skeleton project', (builder) => {
    return builder.option('component-name', {
      alias: 'c',
      describe: 'component\'s name',
      type: "array",
      demandOption: true,
    })
      .example('Skeleton --component-name animals', 'Generate a skeleton project with the name animals')
      .example('Skeleton -c animals -c users', 'Generate a skeleton project with the name animals and users')
  })
  .epilog('For more information, visit github.com/brunofay1')

const env = process.env.NODE_ENV
const defaultFolder = env === 'dev' ? "tmp" : "src"

const layers = ['service', 'factory', 'repository'].sort()
const config = {
  mainPath: '.',
  layers,
  defaultMainFolder: defaultFolder,

}

await createLayersIfNotExists(config)

const pendingPromises = []
for (const domain of componentName) {
  const result = createFiles({ ...config, componentName: domain })
  pendingPromises.push(result)
}

await Promise.all(pendingPromises)
