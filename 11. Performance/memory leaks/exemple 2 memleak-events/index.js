import { createServer } from 'http'
import Events from 'events'
import { randomBytes } from 'crypto'

const newEvent = new Events()

function getBytes() {
  return randomBytes(1000).toString('base64')
}

function onData() {
  getBytes()
  const items = []
  setInterval(function myInterval() { items.push(Date.now()) })
}

createServer(function handler(req, res) {
  newEvent.on('data', onData)
  newEvent.emit('data', Date.now())

  res.end('Hello World')
}).listen(3000, () => console.log('Server running on port 3000'))

