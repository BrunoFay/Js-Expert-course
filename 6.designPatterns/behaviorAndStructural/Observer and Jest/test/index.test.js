import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import Payment from '../src/events/payment.js'
import Marketing from '../src/observers/marketing.js'
import Shipment from '../src/observers/shipment.js'
import PaymentSubject from '../src/subjects/paymentSubject.js'

describe('Test suite for Observer Pattern', () => {
  /* how to mock to console doesn't show in terminal */
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => { })
  })

  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    const expected = data

    subject.subscribe(observer)
    subject.notify(data)

    expect(observer.update).toBeCalledWith(expected)

  })

  test('#PaymentSubject should not notify unsubscribe observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    const expected = data

    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)

    expect(observer.update).not.toBeCalledWith(expected)

  })

  test('#PaymentSubject should  notify subject after a card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    )
    const data = { userName: 'bruno fay', id: Date.now() }
    payment.creditCard(data)

    expect(paymentNotifierSpy).toBeCalledWith(data)

  })

  test('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    const marketing = new Marketing()

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const payment = new Payment(subject)
    const data = { id: Date.now(), userName: 'bruno fay' }
    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)
  })
})
