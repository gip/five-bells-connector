'use strict'

const UnprocessableEntityError =
require('five-bells-shared/errors/unprocessable-entity-error')

module.exports = function UnacceptableAmountError (message) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message
}

require('util').inherits(module.exports, UnprocessableEntityError)

module.exports.prototype.handler = function *(ctx, log) {
  log.warn('Unacceptable Amount: ' + this.message)
  ctx.status = 422
  ctx.body = {
    id: this.name,
    message: this.message
  }
}