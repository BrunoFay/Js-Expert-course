import http from 'http'
import { Readable } from 'stream'

function api1(req, res) {
  /*
  response.write('a\n');
  response.write('b\n');
  response.write('c\n');
  response.end();

  request.pipe(response);
  */

  let count = 0
  const maxItems = 100
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          const person = { id: Date.now() + count, name: `Alessandra-${count}` }
          const data = JSON.stringify(person);
          this.push(data);
          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }
      setInterval(function () { everySecond(this) })
    }
  })
  readable.pipe(res)
}

http.createServer(api1).listen(3000, () => console.log('server running on port 3000'))

function api2(req, res) {
  let count = 0
  const maxItems = 100
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          const person = { id: Date.now() + count, name: `Bruno-${count}` }
          const data = JSON.stringify(person);
          this.push(data);
          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }
      setInterval(function () { everySecond(this) })
    }
  })
  readable.pipe(res)
}

http.createServer(api2).listen(4000, () => console.log('server running on port 4000'))
