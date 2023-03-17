/*
  ls | grep package | xargs cat | jq .name

  to get user input in terminal
  process.stdin.pipe(process.stdout)
    .on('data', (msg) => console.log('data', msg.toString()))
    .on('error', (err) => console.log('error', err))
    .on('end', () => console.log('end'))
    .on('close', () => console.log('close'))

  socket example:
  terminal 1
  node -e "require('net").createServer(socket => socket.pipe(process.stdout)).listen(1338)"

  terminal 2
  node -e "process.stdin.pipe(require('net').connect(1338))"

  create a big file:
  node -e "process.stdout.write(crypto.randomBytes(1e9)) > big.file"
  */

/* read big files */
import http from 'http';
import { createReadStream, readFileSync } from 'fs'

http.createServer((req, res) => {
  /* bad practice:
  const file = readFileSync('./big.file').toString()
  res.write(file)
  res.end()
  */
  createReadStream('big.file').pipe(res)
}).listen(3000, () => console.log('server started at port 3000'))

// curl localhost:3000 -output.txt
