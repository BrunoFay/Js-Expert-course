class NotImplementedError extends Error {
  constructor(message) {
    super(`${message} as called without an implementation`)

    this.name = "NotImplementedError"
  }
}

export { NotImplementedError }
