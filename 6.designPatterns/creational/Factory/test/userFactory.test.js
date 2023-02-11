const rewireMock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

// poderia estar em outro arquivo
//mock  do db para o patter factory
const dbData = [{ name: 'Jamal' }, { name: 'karin' }]

class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}

// poderia estar em outro arquivo

rewireMock(() => require('./../src/util/database')).with(MockDatabase)

  ; (async () => {
    {
      const expected = [{ name: 'JAMAL' }, { name: 'KARIN' }]
      rewireMock.enable()
      const UserFactory = require('../src/factory/userFactory')

      const userFactory = await UserFactory.createInstance()
      const result = await userFactory.find()
      deepStrictEqual(result, expected)
      rewireMock.disable()
    }
    {
      const expected = [{ name: 'BRUNOFAY' }]
      const UserFactory = require('../src/factory/userFactory')

      const userFactory = await UserFactory.createInstance()
      const result = await userFactory.find()
      deepStrictEqual(result, expected)
    }
  })()
