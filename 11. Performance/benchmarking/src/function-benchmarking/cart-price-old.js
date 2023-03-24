export default class Cart {
  constructor({ at, products }) {
    this.products = products
    this.total = this.getCartPrice()
  }

  getCartPrice() {
    return this.products
      .map(product => product.price)
      .reduce((acc, cur) => acc + cur, 0)
  }

}
