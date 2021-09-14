const LogHelper = require('../../utils/helpers/log-helper')
const { ServerError } = require('../../utils/errors')

module.exports = class HttpResponse {
  static next () {
    return {
      statusCode: 0
    }
  }

  static ok (body) {
    return {
      statusCode: 200,
      body
    }
  }

  static created (body) {
    return {
      statusCode: 201,
      body
    }
  }

  static badRequest (error, bodyAmmends = {}) {
    return {
      statusCode: 400,
      body: {
        error: error.message,
        ...bodyAmmends
      }
    }
  }

  static serverError (error) {
    LogHelper.error(error)

    return {
      statusCode: 500,
      body: {
        error: new ServerError().message
      }
    }
  }
}
