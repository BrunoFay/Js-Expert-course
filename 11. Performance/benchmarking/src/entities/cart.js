import Product from "./product.js"
import { v4 as uuid } from "uuid"

export default class Cart {
  constructor({ at, products }) {
    this.id = uuid()
    this.at = at
    this.products = this.removeUndefinedProperties(products)
    this.total = this.getCartPrice()
  }

  removeUndefinedProperties() {
    const productsEntities = product
      .filter(product => Reflect.ownKeys(product).length > 0)
      .map(product => new Product(product))

    return JSON.parse(JSON.stringify(productsEntities))
  }

  getCartPrice() {
    return this.products
      .map(product => product.price)
      .reduce((acc, cur) => acc + cur, 0)
  }

}

