'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'

event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    // console.log('chamou!',{object,prop})
    return object[prop]
  }
})

setInterval(function () {
  proxy.counter += 1
  if (proxy.counter === 10) clearInterval(this)
}, 200)

/*use setTimeout with time 0 is a bad practice  */
setTimeout(() => {
  proxy.counter = 4
  console.log('[3]: timeout')
}, 0)

/* right way to exec function immediately  */
setImmediate(() => {
  console.log('[2]: setImmediate', proxy.counter)
})

/* pierces the function execution cycle queue in the node */
process.nextTick(() => {
  proxy.counter = 2
  console.log('[1]: nextTick')

})
