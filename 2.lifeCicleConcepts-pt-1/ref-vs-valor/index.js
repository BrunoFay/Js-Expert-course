const { deepStrictEqual } = require('assert')

let counter = 0
let counter2 = counter
counter2++

const item = { counter: 0 }
const item2 = item

/* primitive type make a copy in memory */
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

/* reference type,copy the memory address and points to the same place */

item2.counter++
deepStrictEqual(item, { counter: 1 })
item2.counter++
deepStrictEqual(item2, { counter: 2 })


