const assert = require('assert')

/* most used in lists without duplicates */
const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)


assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3',])


/* junior way */
const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3',])

/* senior way */

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3',])

/* how to check if item has in array?
  [].indexOf['item-index'] !== -1 or [].includes(item)
*/
// check if item exists in set (same way of map)

assert.ok(set.has('3'))

/*
 - same theory as Map,but you always work with the whole list
- there is no get so you can know if the is in the array or not and that's it
- in the docu, there are examples on how to make an interception, (knowing what is in a list and not in the other)

*/

/*  has in both arrays */

const user1 = new Set([
  'bruno',
  'alessandra',
  'kaidou'
])

const user2 = new Set([
  'james',
  'alessandra',
  'pandora'
])

const interception = new Set([...user1].filter(user => user2.has(user)))
assert.deepStrictEqual(Array.from(new Set([...user1].filter(user => user2.has(user)))), Array.from(interception))

const difference = new Set([...user1].filter(user => !user2.has(user)))
assert.deepStrictEqual(Array.from(new Set([...user1].filter(user => !user2.has(user)))), Array.from(difference))


/* weak Set*/

/*
- basically, same logic of weak Map
- not iterable only works with references keys
- has only 3 methods
*/

const user = { id: 123 }
const secondUser = { id: 321 }

const weakSet = new WeakSet([user])
weakSet.add(secondUser)
weakSet.delete(user)
weakSet.has(user)
