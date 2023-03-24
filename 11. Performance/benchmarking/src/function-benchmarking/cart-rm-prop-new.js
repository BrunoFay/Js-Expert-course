import Product from '../entities/product.js'

export default class Cart {
  constructor({ at, products }) {
    this.products = this.removeUndefinedProperties(products)
  }

  removeUndefinedProperties(products) {
    const result = []
    for (const product of products) {
      const keys = Reflect.ownKeys(product)
      if (!keys.length) continue;
      //1
      /* result.push(JSON.parse(JSON.stringify(new Product(product)))) */

      //2 almost 6x faster than 1
      /*    keys.forEach(key => product[key] || delete product[key])
         keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
         result.push(new Product(product)) */
      //3 almost 6x faster than 1 
      let newObj = {}
      keys.forEach(key => {
        if (!keys[key]) return;

        newObj[key] = keys[key]
      })
      result.push(new Product(newObj))
    }

    return result
  }
}
