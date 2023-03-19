import { pipeline } from 'stream/promises'
import axios from 'axios';

const API_1 = 'http://localhost:3000';
const API_2 = 'http://localhost:4000';

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_1,
    responseType: 'stream',
  }),
  axios({
    method: 'get',
    url: API_2,
    responseType: 'stream',
  })
])

const results = requests.map(({ data }) => data);

/* writable stream */
async function* output(stream) {
  for await (const data of stream) {
    /*
     ?=- -> he does seek from the - and look back
     :"(?<name>.*)" -> look for content inside the quotes after the : and extract only the name
    */
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
  }
}
;

async function* merge(streams) {
  for (const readable of streams) {
    /* make work if objectMode */
    readable.setEncoding('utf8');
    for await (const chunk of readable) {
      /* necessary to split in multiples lines - (get a lib to do this, is better) */
      for (const line of chunk.trim().split(/\n/)) {
        yield line;

      }
    }

  }
}

await pipeline(
  merge(results),
  output
)
