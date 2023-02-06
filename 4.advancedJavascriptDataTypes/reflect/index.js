'use strict'


const assert = require('assert')

/* ensure semantics and security in objects */

// --- apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

// Function.prototype.apply = () => {throw new TypeError('eita')}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

/*
this's dangerous!
*/
myObj.add.apply = function () { throw new TypeError('Vixxx') }

/* how to test errors:  */
assert.throws(
  () => myObj.add.apply({}, []),
  { name: 'TypeError', message: 'Vixxx' }
)


// using Reflect
const result = Reflect.apply(myObj.add, { arg1: 20, arg2: 40 }, [200])
assert.deepStrictEqual(result, 260)

//apply

//----defineProperty

// semantic question

function MyDate() { }

/* ugly way.
  always is an Object, but an Object add a prop to a function?
*/

// ------ define property

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey There' })

/* semantic way */

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })


assert.deepStrictEqual(MyDate.withObject(), 'Hey There')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')

//delete property


const withDelete = { user: 'bruno fay' }

delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'XuxaDaSilva' }

Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)



// --- get

/* we should make get only in reference instance */
assert.deepStrictEqual(1['userName'], undefined)
// with reflection, an error is throw

assert.throws(() => Reflect.get(1, "useName"), TypeError)



// -----has

assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ flash: '' }, 'flash'))


// ownKeys
const user = Symbol('user')
const databaseUser = {
  id:1,
  [Symbol.for('password')]:123,
  [user]:'brunofay'
}

/* with object methods, we need to make 2 requests */

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]

assert.deepStrictEqual(objectKeys, ['id',Symbol.for('password'),user])


/* with reflect  */

assert.deepStrictEqual(Reflect.ownKeys(databaseUser),['id',Symbol.for('password'),user])
