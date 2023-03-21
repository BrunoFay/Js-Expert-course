import timers from 'timers/promises';
const timeoutAsync = timers.setTimeout;

const results = ['1', '2'].map(async (item) => {
  console.log('starting processing item');
  await timeoutAsync(100);
  console.log(item);
  console.log(await Promise.reject('timeout inside map!'))
  await timeoutAsync(100);
  console.count('debug')

  return parseInt(item) * 2;

});
console.log('results', await Promise.all(results));

setTimeout(async () => {
  console.log('starting process!')
  await timeoutAsync(100);
  console.count('debug')
  console.log(await Promise.reject('timeout inside timeout!'))
  await timeoutAsync(100);
  console.count('debug')
}, 1000)

const throwError = (msg) => { throw new Error(msg); }

try {
  console.log('hello')
  console.log('world')
  throwError('error inside try/catch!')
} catch (error) {
  console.log('get inside catch!', error.message)
}

/* serves to capture rejects errors in different contexts, without breaking the application */
process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection', e.message || e)
  /*ideal for when working with containers. in: case of a certain error, restart the application from scratch  */
  process.exit(1)
})

Promise.reject('promised rejected!')

/* if Promise.reject is inside another context, it falls into unhandledRejection */
setTimeout(async () => {
  await Promise.reject('error inside timeout and out of catch async/await! ')
})

/*
but if it is in the global context it falls into uncaughtException
await Promise.reject('error inside timeout and out of catch async/await! ')
uncaughtException
ideal for bugs in general
*/
setTimeout(() => {
  throwError('error inside timeout and out of catch!')
}, 1000)
