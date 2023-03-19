import { pipeline } from 'stream/promises';
import { setTimeout } from 'timers/promises';

async function* myCustomReadable() {
  yield Buffer.from('this is my')
  await setTimeout(1000)
  yield Buffer.from(' custom readable')
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    /* set chunk.toString because chunk is a Buffer */
    yield chunk.toString().replace(/\s/g, '_')
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = []

  for await (const chunk of stream) {
    console.log('[duplex writable', chunk)
    bytesRead += chunk.length;
    wholeString.push(chunk)
  }

  yield `wholeString ${wholeString.join()}`
  yield `bytesRead ${bytesRead}`
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log('chunk', chunk)
  }
}

try {
  const controller = new AbortController();
  /* if it's necessary abort all process */
  setImmediate(() => controller.abort())

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal }
  )
  console.log('process has finished')
} catch (error) {
  console.error('\nerror', error.message)
}
