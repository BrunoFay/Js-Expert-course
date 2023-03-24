import Product from '../entities/product.js'

export default class Cart {
  constructor({ at, products }) {

    this.products = this.removeUndefinedProperties(products)
  }

  removeUndefinedProperties(products) {
    const productsEntities = products
      .filter(product => Reflect.ownKeys(product).length > 0)
      .map(product => new Product(product))

    return JSON.parse(JSON.stringify(productsEntities))
  }

}
