import { createServer } from 'http'
import BusinessError from './error/businessError.js'
import { statusCodes } from './httpStatusCodes.js'

function validateHero(hero) {
  /* simulate a generic error, ex db error */
  if (Reflect.has(hero, "connectionError")) {
    /*  its just a generic message */
    throw new Error('errot connect to DB!')
  }
  if (hero.age < 20) {
    throw new BusinessError('age must be higher than 20!')
  }
  if (hero.name?.length < 4) {
    throw new BusinessError('name must be higher than 4!')

  }

}

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data)
      validateHero(hero)
      res.writeHead(statusCodes.OK)
      res.end()
    } catch (error) {
      if (error instanceof BusinessError) {
        /* never send a internal server error message to client! */
        res.writeHead(statusCodes.BAD_REQUEST)
        res.end(error.message)
        /* similar to next of middleware */
        continue
      }
      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
      res.end()
    }
  }
}
createServer(handler).listen(3000, () => console.log('server running at port 3000'))

/*
curl -i localhost:3000 -X POST --data {"name":"flash","age":60} */
