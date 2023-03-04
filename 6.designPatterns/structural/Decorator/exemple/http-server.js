InjectHttpInterceptor()
import http from 'http'
import { InjectHttpInterceptor } from './../index.js'

/* curl -i localhost 6666 -> to test server */

function handleRequest(request, response) {
  /* response.seHeader('X-Instrumented-By','Bruno fay') */
  response.end('Hello world')
}

const server = http.createServer(handleRequest)
const port = 6666
server.listen(port, () => console.log('server running at', server.address().port))
