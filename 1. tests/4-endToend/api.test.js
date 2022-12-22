const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const { deepStrictEqual } = require('assert')
  ;

describe('API suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app).get('/contact').expect(200)
      deepStrictEqual(response.text, 'contact us page')
    })
  })

  describe('/hello', () => {
    it('should request return hello world and return HTTP Status 200', async () => {
      const response = await request(app).get('/').expect(200)
      deepStrictEqual(response.text, 'hello world')
    })
  })

  describe('/login', () => {
    it('should request return login has successfully and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ userName: 'brunoFay', password: '123' })
        .expect(200)
      deepStrictEqual(response.text, 'login has successfully')
    })

    it('should request return login has failed! and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ userName: 'brunoFay', password: '1233' })
        .expect(401)
      deepStrictEqual(response.text, 'login has failed!')
    })
  })
})