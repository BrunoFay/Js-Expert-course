const BaseRepository = require('../repository/base');
const Tax = require('../entities/tax');
const Transaction = require('../entities/transaction');

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBaseOnAge = Tax.taxesBaseOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  calculateFinalPrice() {

  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(Math.random() * (listLength))
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carsIds)
    const carId = carCategory.carsIds[randomCarIndex]
    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory
    const { tax } = this.taxesBaseOnAge.find(({ from, to }) => age >= from && age <= to)
    const finalPrice = ((tax * price) * (numberOfDays))
    const formattedPrice = this.currencyFormat.format(finalPrice)

    return formattedPrice
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays)

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' }
    const dueDate = today.toLocaleDateString("pt-br", optionsDate)

    const transaction = new Transaction({
      car,
      dueDate,
      amount: finalPrice,
      customer
    })
    return transaction
  }
}

module.exports = CarService