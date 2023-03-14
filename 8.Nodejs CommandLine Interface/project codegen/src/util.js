export default class Util {
  static #transform({ str: [first, ...rest], upperCase = true }) {
    if (!first) return ''
    const firstLatter = upperCase ? first.toUpperCase() : first.toLowerCase()
    return [firstLatter, ...rest].join('')
  }
  /* created static methods because the class not need saved information */
  static upperCaseFirstLatter(str) {
    return Util.#transform({ str })
  }
  static lowerCaseFirstLatter(str) {
    return Util.#transform({ str, upperCase: false })
  }
}
