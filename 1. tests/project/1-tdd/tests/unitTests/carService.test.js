const CarService = require('../../src/services/carServices');
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

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
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
})