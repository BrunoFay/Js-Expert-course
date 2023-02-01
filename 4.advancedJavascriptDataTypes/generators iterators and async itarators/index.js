const assert = require('assert')

function* calculate(arg1, arg2) {
  yield arg1 * arg2
}

function* hello() {
  yield 'Hello'
  yield '-----'
  yield 'World'
  /* needs "*" on yield to execute the iterator function*/
  yield* calculate(20, 10)
}


const generator = hello()

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-----', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

/* ways to display iterators result */

assert.deepStrictEqual(Array.from(hello()), ['Hello', '-----', 'World', 200])
assert.deepStrictEqual([...hello()], ['Hello', '-----', 'World', 200])

/* async iterators */

const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')

}

/* ways to resolve iterators promise */

// Promise.all([...promisified()]).then(result => console.log('promisified', result))

/* (async () => {
  for await (const item of promisified()) {
    console.log('for await', item.toString())
  }
})()
 */

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

(async () => {
  for await (const item of systemInfo()) {
    console.log('for await', item)
  }
})()
