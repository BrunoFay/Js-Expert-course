const Product = require('../../src/entities/product')

class ProductDataBuilder {
  constructor() {
    this.ProductData = {
      id: '00002',
      name: '',
      price: 1000,
      category: 'electronic'
    }
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  withInvalidId() {
    this.ProductData.id = '1'
    return this
  }

  withInvalidName() {
    this.ProductData.name = 'abc123'
    return this
  }

  withInvalidPrice() {
    this.ProductData.price = 0
    return this
  }

  withInvalidCategory() {
    this.ProductData.category = "inorganic"
    return this
  }

  build() {
    const product = new Product(this.ProductData)
    return product
  }
}

module.exports = {
  ProductDataBuilder
}
