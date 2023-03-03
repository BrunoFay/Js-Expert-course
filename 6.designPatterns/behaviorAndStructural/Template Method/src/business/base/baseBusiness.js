import { NotImplementedError } from "../../util/exceptions.js"

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedError(
      this._validateRequiredFields.name
    )
  }

  _create(data) {
    throw new NotImplementedError(
      this._create.name
    )

  }

  /* martin fowler pattern
 this patter must guarantee a flow of methods, defining a sequence of methods to be executed

  this create is effective implementation of Template Method
 */
  create(data) {
    const isValid = this._validateRequiredFields(data)
    if (!isValid) throw new Error('invalid data')
    const created = this._create(data)
    return created
  }
}
