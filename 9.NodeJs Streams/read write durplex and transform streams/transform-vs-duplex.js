import { Duplex, Transform } from "stream";

let count = 0
const server = new Duplex({
  objectMode: true, // make it work with objects without buffer => spend more memory
  encoding: 'utf-8',
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push({ id: count, name: `bruno ${count}` })
        return
      }
      clearImmediate(intervalContext)
      this.push(null)
    }
    setInterval(function () { everySecond(this) })
  },
  // like a complete different object!
  write(chunk, encoding, callback) {
    console.log('[writable] saving', chunk)
    callback()
  }
})

/* prove that methods are a different communication chanel
write adds the writable of Duplex
*/
server.write('[duplex] hey this is a writable!\n')

/* on data => get log from .push of readable
server.on('data', (msg) => console.log(`[readable]${msg}`))
*/

/* push send more data */
server.push('[duplex] hey this is also a readable!\n')

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback(null, chunk.toUpperCase())
  }
})

/* transform is a duplex, but don't have a independent communication */
transformToUpperCase.write('[transform] hello from write!')

/* push will ignore what do yo hava in transform function */
transformToUpperCase.push('[transform] hello from push!\n')

server
  .pipe(transformToUpperCase)
  /* redirect all data from readable to writable of duplex */
  .pipe(server)
