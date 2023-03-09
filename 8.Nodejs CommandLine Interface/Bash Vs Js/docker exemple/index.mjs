$.verbose = false
import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'


await $`docker run -p "8080:80" -d nginx`
await setTimeout(500)
const req = await $`curl --silent localhost:8080`
/* console.log(`req\n`, req.stdout) */

const containers = await $`docker ps`

/* pega a primeira palavra antes do nginx */
const exp = /(?<containerId>\w+)\W+(?=nginx)/

/* forma de testar se esta validando mesmo const exp = /(?<containerId>\w+)\w+(?=nginx)(x+x+)+y/ */

if (!isSafe(exp)) throw new Error('unsafe regex')

/* console.log(containers.toString().match(exp)) */

const { groups: { containerId } } = containers.toString().match(exp)

const logs = await $`docker logs ${containerId}`
console.log('logs\n',logs.stdout)
const rm = await $`docker rm -f ${containerId}`

console.log('rm -f\n',rm.stdout)

