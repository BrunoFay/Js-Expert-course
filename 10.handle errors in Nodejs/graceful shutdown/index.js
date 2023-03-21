import { MongoClient } from 'mongodb'
import http from 'http'
import { promisify } from 'util'
/* docker commando to run it: docker run -d -p 27017:27017 --name test-mongo mongo:latest
 */
async function dbConnect() {
  const client = new MongoClient("mongodb://localhost:27017")
  await client.connect()
  console.log("Connected to MongoDB")
  const db = client.db("comics")
  return {
    collections: { heroes: db.collection("heroes") },
    client
  }
}

const { collections, client } = await dbConnect()
async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({ ...hero, updatedAt: new Date().toISOString() })
      const heroes = await collections.heroes.find().toArray()
      res.writeHead(200)
      res.write(JSON.stringify(heroes))
    } catch (error) {
      console.log('a request error has happened', error)
      res.writeHead(500)
      res.write(JSON.stringify({ error: error.message }))
    } finally {
      res.end()
    }
  }
}

await collections.heroes.insertOne({ updateAt: new Date(), name: "Batman" })

const heroes = await collections.heroes.find().toArray()
console.log({ heroes })

/*
await client.close()
  curl -i localhost:3000 -X POST ---data '{"name":"Superman, "power": "1000" }'
*/

const server = http.createServer(handler).listen(3000, () => console.log('server is running on port 3000', process.pid))

const onStop = async () => {
  console.info(`\n${signal} signal received.`)
  console.log('Closing http server.')
  /* force this change behavior to promise */
  await promisify(server.close.bind(server))()
  console.log('Http server closed.')
  // close(true) => force close
  await client.close()
  console.log('MongoDB connection closed.')
  /* zero its everything is ok */
  process.exit(0)
}

/*
SIGINT => CTRL + C
SIGTERM => KILL
*/

['SIGINT', 'SIGTERM'].forEach((signal) => process.on(signal, onStop))
