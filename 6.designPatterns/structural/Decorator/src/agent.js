import http from 'http'

export const InjectHttpInterceptor = async () => {
  const oldEmit = http.Server.prototype.emit;
  http.Server.prototype.emit = function (...args) {
    const [type, request, response] = args
    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'Bruno fay')
    }
    return oldEmit.apply(this, args)
  }
}
