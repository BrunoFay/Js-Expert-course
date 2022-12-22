const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const {deepStrictEqual} = require('assert')
;

(async ()=> {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci,fibonacci.execute.name)

    /*generators return iterators,(.next)
    exits 3 ways to read data with methods:
    .next, for await and rest/ spread
    */
    /* the algorithm start from zero */

    for await(const i of fibonacci.execute(3) ){}
    const expectedCallCount = 4

    deepStrictEqual(spy.callCount,expectedCallCount)
  }

  {
  /* same test but with rest/spread */
  const fibonacci = new Fibonacci()
  const spy = sinon.spy(fibonacci,fibonacci.execute.name)
  const [...result] = fibonacci.execute(5)
     /*
     [0] input = 5, current = 0, next = 1
     [1] input = 4, current = 1, next = 1
     [2] input = 3, current = 1, next = 2
     [3] input = 2, current = 2, next = 3
     [4] input = 1, current = 3, next = 5
     [5] input = 0 -> stop
     */

     // spy.getCall(2)  === [2] input = 3, current = 1, next = 2 (secund call)

    const {args} = spy.getCall(2)
    const expectedResult = [0,1,1,2,3]
    const expectedArgs = Object.values({
      inputs:3,
      current:1,
      next:2
    })
    deepStrictEqual(args,expectedArgs)
    deepStrictEqual(result,expectedResult)
  }
  {}
})()