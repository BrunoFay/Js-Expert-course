"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);
const { describe, it } = mocha

const { expect } = chai



describe('', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 bike 20000 2020-09-10 2020-03-12'
    )
    const expected = {
      from: '2020-09-10',
      to: '2020-03-12',
      vehicles: ['bike'],
      kmTraveled: '20000',
      id: '1'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('it should format values', () => {
    const person = new Person({
      from: '2020-09-10',
      to: '2020-03-12',
      vehicles: ['bike'],
      kmTraveled: '20000',
      id: '1'
    })
    const result = person.formatted()
    const expected = {
      id: 1,
      vehicles: 'bike',
      kmTraveled: '20,000 km',
      from: 'September 10, 2020',
      to: 'March 12, 2020'
    }

    expect(result).to.be.deep.equal(expected)
  })

})
