const { faker } = require('@faker-js/faker')
const Car = require('./../src/entities/Car')
const CarCategory = require('./../src/entities/CarCategory')
const Customer = require('./../src/entities/Customer');

const { writeFile } = require('fs/promises')
const { join } = require('path');

const seederBaseFolder = join(__dirname, "../", "database")

const ITEMS_AMOUNT = 2
const carCategory = new CarCategory({
  id: faker.random.alpha(10),
  name: faker.vehicle.type(),
  carsIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []

for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.random.alpha(10),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })

  cars.push(car)
  carCategory.carsIds.push(car.id)

  const customer = new Customer({
    id: faker.random.alpha(10),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 18, max: 50 })
  })

  customers.push(customer)
}

const writeInDatabase = (fileName, data) => writeFile(join(seederBaseFolder, fileName), JSON.stringify(data));
/* alway put a dot when write a file  */
(async () => {
  await writeInDatabase('cars.json', cars)
  await writeInDatabase('carCategory.json', [carCategory])
  await writeInDatabase('customers.json', customers)
  console.table(cars)
  console.table(carCategory)
  console.table(customers)

})()
