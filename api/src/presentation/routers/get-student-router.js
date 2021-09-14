const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../common/http-response')

module.exports = class GetStudentRouter {
  constructor ({ studentUseCase } = {}) {
    this.studentUseCase = studentUseCase
  }

  async route (httpRequest) {
    try {
      const { id } = httpRequest.params
      if (!id || isNaN(id)) return HttpResponse.badRequest(new MissingParamError('ID'))
      const student = await this.studentUseCase.get(parseInt(id))
      return HttpResponse.ok(student)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
