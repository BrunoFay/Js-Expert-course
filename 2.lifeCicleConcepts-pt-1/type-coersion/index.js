999999999999999 // 16
// 1000000000000000

true + 2
// 3

'21' + true
// '21true'

'21' - true
// 20

'21' - - 1
// 22

0.1 + 0.2 === 0.3
// false

3 > 2 > 1
// false

3> 2 >= 1
// true

console.assert(String(123) === '123','explicit convertion to string')

console.assert(('hello' || 123) === 'hello',"|| returns the first element, when both are true")

console.assert(('hello' && 123) === 123,"&& returns the last element, when both are true")


const item = {
  name:'Bruno fay',
  age: 26,
 //string:1 se nao for primitivo,chama o valueOf
  toString(){
    return `Name ${this.name} Age ${this.age}`
  },
 // number:1 se nao for primitivo, chama o toString
  valueOf(){
    return {hey:'dude'}
  },
  [Symbol.toPrimitive](coercionType){
    console.log('Trying to convert to', coercionType)
    const types = {
      string:JSON.stringify(this),
      number: '007'
    }
    return types[coercionType] || types.string
  }
}

// console.log('toString',String(item))

/* vai retornar NaN pois o to string retornou uma string
console.log('valueOf',Number(item))

depois de adicionar o toPrimitive
console.log('String',String(iten))
console.log('Number',Number(iten))

chama a conversão default
console.log('Date', new Date(item))
*/

console.assert(item + 0 === '{"name":"Bruno fay","age":26}0')
// console.log('!! is true?',!!item)

console.assert(!!item)

//console.log('string.concat','Ae'.concat(item))
console.assert('Ae'.concat(item) === 'Ae{"name":"Bruno fay", "age":26}')

//console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item))

const item2 = { ...item, name:"Zézin",age:20}
//console.log('New Object',item2)

console.assert(item2.name === 'Zézin' && item2.age === 20)
