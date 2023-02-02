const assert = require('assert')

/* keys */

const uniqueKey = Symbol('username')
const user = {}

user['username'] = 'value for normal objects'
user[uniqueKey] = 'value from symbol'

/* console.log('getting normal Objects',user.username)
  // always unique in memory address level
console.log('getting normal Objects',user[Symbol('username')])
console.log('getting normal Objects',user[uniqueKey])
 */

assert.deepStrictEqual(user.username, 'value for normal objects')
assert.deepStrictEqual(user[Symbol('username')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value from symbol')

// is hard to catch but it's  not secret
assert.deepEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - bad practice!!

user[Symbol.for("password")] = 123

assert.deepStrictEqual(user[Symbol.for('password')], 123)

// Well known Symbols
const obj = {
  //iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove and return last item from iterator
        value: this.items.pop()
      }
    }
  })
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const Kitems = Symbol('Kitems')

class MyDate {
  constructor(...args) {
    this[Kitems] = args.map(arg => new Date(...arg))
  }
  /* joke */
  get [Symbol.toStringTag]() {
    return 'WHAT'
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()

    const items = this[Kitems].map(item =>
      new Intl
        .DateTimeFormat('pt-br', { month: 'long', day: '2-digit', year: 'numeric' })
        .format(item))

    return new Intl.ListFormat('pt-br', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[Kitems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[Kitems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
}


const myDate = new MyDate([2022, 11, 16], [2018, 07, 01])

const expectedDates = [
  new Date(2022, 11, 16),
  new Date(2018, 07, 01)
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT]')
assert.throws(() => myDate + 1, TypeError)

/* explicit coercion to call toPrimitive */

assert.deepStrictEqual(String(myDate), '16 de dezembro de 2022 e 01 de agosto de 2018')

/* imlement the iterator */

assert.deepStrictEqual([...myDate], expectedDates)

  /* ;(async () => {
      for await (const item of myDate) {
        console.log('asyncIterator', item)
      }
    })()
   */

  ; (async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
  })()
