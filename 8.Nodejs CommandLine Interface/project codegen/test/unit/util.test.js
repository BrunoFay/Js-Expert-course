import { beforeEach, jest, describe, expect, test } from '@jest/globals'
import Util from '../../src/util.js'


describe('#util Strings validations', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('#upperCaseFirstLetter should transform the first letter in uppercase', () => {
    const data = 'james'
    const expected = 'James'
    const result = Util.upperCaseFirstLatter(data)
    expect(result).toStrictEqual(expected)
  })

  test('#upperCaseFirstLetter given an empty string it should return empty', () => {
    const data = ''
    const expected = ''
    const result = Util.upperCaseFirstLatter(data)
    expect(result).toStrictEqual(expected)
  })

  test('#lowerCaseFirstLetter should transform the first letter in lowercase', () => {
    const data = 'Jamal'
    const expected = 'jamal'
    const result = Util.lowerCaseFirstLatter(data)
    expect(result).toStrictEqual(expected)
  })

  test('#lowerCaseFirstLetter given an empty string it should return empty', () => {
    const data = ''
    const expected = ''
    const result = Util.lowerCaseFirstLatter(data)
    expect(result).toStrictEqual(expected)

  })

})
