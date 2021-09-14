module.exports = class NotFoundError extends Error {
  constructor (paramName) {
    super(`Not Found: ${paramName}`)
    this.name = 'NotFoundError'
  }
}
