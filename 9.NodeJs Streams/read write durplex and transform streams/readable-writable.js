import { Readable, Writable } from 'stream';

const readable =  Readable({
  read(){
    this.push('a');
    this.push('b');
    this.push('c');

    /* inform when has no more data  */
    this.push(null);
  }
})

/* output data */

const writable = Writable({
  write(chunk, encoding, callback){
    console.log(chunk.toString());
    callback();
  }
})

/* writable always is the output -> print, save , ignore */
readable
  .pipe(writable)
  /* print in console
  .pipe(process.stdout)
  */


