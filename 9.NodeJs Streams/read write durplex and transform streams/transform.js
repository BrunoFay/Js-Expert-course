import { createWriteStream } from 'fs';
import { Readable, Writable, Transform } from 'stream';

const readable = Readable({
  read() {
    this.push('a');
    this.push('b');
    this.push('c');


    //very cool! 1.000.000 for (let i = 0; i < 1e6; i++) {

    for (let i = 0; i < 100; i++) {
      const person = { id: Date.now() + i, name: `bruno ${i}` }
      const data = JSON.stringify(person);
      this.push(data);
    }
    /* inform when has no more data  */
    this.push(null);
  }
})

/* data process */
const mapFields = Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk)
    const result = `${data.id} - ${data.name.toUpperCase()}\n`
    callback(null, result);
  }
})

const mapHeaders = Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter ?? 0;
    if (this.counter === 0) {
      return callback(null, chunk);
    }
    this.counter++;
    const result = `id - name\n`.concat(chunk)
    callback(null, result);
  }
})


/* writable always is the output -> print, save , ignore */
readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  /* only need file name to write */
  .pipe(createWriteStream('my.csv'))
  /* print in console
.pipe(process.stdout)
*/


