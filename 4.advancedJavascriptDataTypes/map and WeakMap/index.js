const assert = require('assert')
const myMap = new Map();

//  can have any key
myMap
  .set(1, 'one')
  .set('bruno', { text: 'two' })
  .set(true, () => 'hello')

// using a constructor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

/* console.log('myMap',myMap)
console.log(myMap.get(1)) */

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('bruno'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// in Objects the key can only be a string or Symbol (number is converted ro string)

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'brunoFay' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'brunoFay' })

//utils
// - in Object that would be Objects.keys({a:1}).length
assert.deepStrictEqual(myMap.size, 4)
/*
to check if object has an item
item.key = if doesn't exist = undefined
if() = implicit converted to boolean and return false
right way is ({name:'bruno'}).hasOwnProperty('name')
*/
assert.ok(myMap.has(onlyReferenceWorks))

/*
to remove an item from Object
delete item.id
imperformatic for the js
*/
assert.ok(myMap.delete(onlyReferenceWorks))

/*
it is not possible to iterate over objects directly
need to transform with Object.entries(item)
*/

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["bruno", { "text": "two" }], [true, () => { }]]))

/*
  for ( const [key, value] of myMap){
    console.log({key,value})
  }

  Object is unsafe, because name key can change a default behavior
  ({}).toString() === ' [object Object]
  ({toString: () => 'Hey' }).toString() === 'Hey'

  any key can collide can collide with the properties inherited by the object, ex:
  constructor,toString, valueOf e etc.
*/

const actor = {
  name:'xuxa da Silva',
  toString: 'Queen: xuxa da Silva'
}

/* has no restriction in key name */
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(()=> myMap.get(actor).toString,TypeError)

// you can't clean the object without reassigning it
myMap.clear()
assert.deepStrictEqual([...myMap.keys()],[])


/* --- Weak Map */

/*
can be collected after lost the references
used in very specific cases
has majority properties of Map
BUT it's not iterable
only referenced keys and keys already known
lighter and brief memory leak because after the instances leave the memory everything is cleaned up
*/

const weakMap = new WeakMap()
const hero = {name:'flash'}

/*
 weakMap.set(hero)
 weakMap.get(hero)
 weakMap.delete(hero)
 weakMap.has(hero)
*/
