import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'


describe('#Test suite for Template Method design pattern', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })
  describe('#OrderBusiness', () => {

    test('execute Order Business without Template Method', () => {
      const order = new Order({
        customerId: '2',
        amount: 200,
        products: [{ description: 'mouse' }]
      })
      const orderBusiness = new OrderBusiness()

      /* all devs must remember to strictly follow this execution flow.
        if some forget to call the validation function, it can break the whole system !*/

      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })

    test('execute Order Business with Template Method', () => {
      const order = new Order({
        customerId: '2',
        amount: 200,
        products: [{ description: 'mouse' }]
      })
      const orderBusiness = new OrderBusiness()
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      )
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      )

      /* with Template method, the sequence always is executed, avoiding code duplication */

      const result = orderBusiness.create(order)
      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()

    })
  })
})
