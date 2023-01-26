'use strict'

const { watch, promises: { readFile } } = require('fs')

/* watch(__filename,async (event,filename)=>{
  //
  console.log((await readFile(filename)).toString())
})
 */

class File {
  watch(event,filename){
    console.log('this:',this)
    /* form to get arguments passed to a method */
    console.log('arguments',Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }
  async showContent(filename){
    console.log((await readFile(filename)).toString())

  }
}

const file = new File()
/*
in that way it ignores the 'this' of class File and inherits 'this' from watch
watch (__filename,file.watch)
*/

/* uncly alternative to don't inherits 'this' from watch method
watch (__filename,(event,filename)=>file.watch(event,filename))
*/

/* best way to resolve this context problem
the bind return a function with the this of File class, ignoring the this from watch method
watch (__filename,file.watch.bind(file))
*/

/* sinon mock behavior */

file.watch.call({ showContent: ()=> console.log('call:yes that is a mock!')},null,__filename)
/* same behavior but differentn way to pass second argument */
file.watch.apply({ showContent: ()=> console.log('call:yes that is a mock!')},[null,__filename])
