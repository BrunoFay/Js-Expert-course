const CarService = require('../../src/services/carServices');
const Transaction = require('../../src/entities/transaction');
const { describe, it, before, beforeEach, afterEach } = require('mocha')
const sinon = require('sinon');
const { join } = require('path');
const { expect } = require('chai');


const mocks = {
  validCar: require('../mocks/valid-car.json'),
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCustomer: require('../mocks/valid-customer.json')
}

const carsDatabase = join(__dirname, './../../database', 'cars.json');

describe('CarService Suite tests', () => {
  let carService = {}
  let sandbox = {}

  before(() => {
    carService = new CarService({ cars: carsDatabase })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('should retrieve first id from carsIds in carCategory', () => {
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0

    /*  force function always return the first index of array */
    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carsIds[carIdIndex]

    expect(result).to.be.equal(expected)
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
  })

  it('given a car category it should return an available car', async () => {
    const carMock = mocks.validCar
    const carCategoryMock = Object.create(mocks.validCarCategory)
    carCategoryMock.carsIds = [carMock.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(carMock)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )
    const result = await carService.getAvailableCar(carCategoryMock)
    const expected = carMock

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(carMock.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)

  })

  it('given category car, customer age and number Of days it should calculate final amount in R$', () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50

    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6

    const numberOfDays = 5

    /* age:50 -1.3 tax - categoryPrice 37.6
    37.6 * 1.3 = 48,88 * 5 days = 244.40
    */

    /* don't depend of external data! stub and mock everything */
    sandbox.stub(carService, 'taxesBaseOnAge').get(() => [{ from: 40, to: 50, tax: 1.3 }])

    const expected = carService.currencyFormat.format(244.40)
    const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays)

    expect(result).to.be.equal(expected)
  })

  it('given a customer and a car category it should return a transaction receipt', async () => {
    const carMock = mocks.validCar
    const carCategoryMock = {
      ...mocks.validCarCategory,
      price: 37.6,
      carsIds: [carMock.id]
    }
    const customerMock = Object.create(mocks.validCustomer)
    customerMock.age = 20

    const numberOfDays = 5
    const dueDate = "10 de novembro de 2020"

    const now = new Date(2020, 10, 5)

    /* stub function new date */
    sandbox.useFakeTimers(now.getTime())


    const expectedAmount = carService.currencyFormat.format(206.80)
    const result = await carService.rent(
      customerMock,
      carCategoryMock,
      numberOfDays
    )

    const expected = new Transaction({
      car: carMock,
      amount: expectedAmount,
      dueDate,
      customer: customerMock
    })

    expect(result).to.be.deep.equal(expected)
  })
})