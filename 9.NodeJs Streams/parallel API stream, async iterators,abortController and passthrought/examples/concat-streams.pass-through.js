import { Writable, PassThrough } from 'stream';
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

const output = Writable({
  write(chunk, encoding, callback) {
    const data = chunk.toString();
    /*
     ?=- -> he does seek from the - and look back
     :"(?<name>.*)" -> look for content inside the quotes after the : and extract only the name
    */
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`${name.toLowerCase()} : ${data}`);

    /* don't forgot to call the callback! */
    callback();

  }
});

function merge(streams) {
  return streams.reduce((acc, curr, index, array) => {
    /* prevents steam from closing by itself */
    curr.pipe(acc, { end: false });

    /*
    since end: false is set, we'll handle it manually when our current ends. When it finishes, let's check if everyone in the pipeline has closed it will then force the previous chain to close
    */
    curr.on('end', () => array.every(s => s.ended) && prev.end())
    return acc
  }, new PassThrough())
}

merge(results).pipe(output);
