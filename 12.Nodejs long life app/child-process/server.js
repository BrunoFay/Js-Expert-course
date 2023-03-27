import { createServer } from 'https'
import { randomUUID } from 'crypto'
import { pipeline } from 'stream/promises'
import { createWriteStream } from 'fs'

async function handler(req, res) {
  const fileName = `file-${randomUUID()}.csv`
  await pipeline(
    req,
    createWriteStream(fileName)
  )

  res.end('file upload with success!')
}


createServer(handler).listen(3000, () => console.log('server running at port 3000'))
