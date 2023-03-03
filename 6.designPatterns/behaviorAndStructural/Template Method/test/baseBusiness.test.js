import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedError } from '../src/util/exceptions.js'


describe('#BaseBusiness suite', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test("should throw an error when child class doesn't implement _validateRequiredFields function", () => {
    class ConcreteClass extends BaseBusiness { }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedError(
      concreteClass._validateRequiredFields.name
    )
    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test('should throw an error when _validateRequiredFields returns false', () => {
    const VALIDATION_UNSUCCESS = false
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_UNSUCCESS)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new Error('invalid data')
    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test("should throw an error when child class doesn't implement _create function", () => {
    const VALIDATION_SUCCESS = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCESS)
    }
    const concreteClass = new ConcreteClass()

    const createError = new NotImplementedError(
      concreteClass._create.name
    )
    expect(() => concreteClass.create({})).toThrow(createError)

  })

  test("should call _validateRequiredFields and _create functions on create function", () => {
    const VALIDATION_SUCCESS = true
    const CREATE_SUCCESS = true

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCESS)
      _create = jest.fn().mockReturnValue(CREATE_SUCCESS)
    }
    const concreteClass = new ConcreteClass()

    /*  a way to test if you are calling the create of the mother class instead of the child class*/
    const createFromBaseClass = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    )

    const result = concreteClass.create({})
    expect(result).toBeTruthy()
    expect(createFromBaseClass).toHaveBeenCalled()
    expect(concreteClass._create).toHaveBeenCalled()
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
  })

})
