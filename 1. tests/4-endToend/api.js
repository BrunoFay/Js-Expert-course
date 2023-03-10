const http = require('http');

const DEFAULT_USER = { userName: 'brunoFay', password: '123' }

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact us page')
    return res.end()
  },
  '/login:post': async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data)
      if (DEFAULT_USER.userName !== user.userName || DEFAULT_USER.password !== user.password) {
        res.writeHead(401)
        res.write('login has failed!')
        return res.end()
      }
      res.writeHead(200)
      res.write('login has successfully')
      return res.end()
    }
  },
  default: (req, res) => {
    res.write('hello world')
    return res.end()
  }
}

const handler = (req, res) => {
  const { url, method } = req
  const routeKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  return chosen(req, res)
}

const app = http.createServer(handler).listen(3000, () =>
  console.log("server running!"))

module.exports = app