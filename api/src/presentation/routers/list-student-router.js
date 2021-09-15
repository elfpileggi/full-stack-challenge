const HttpResponse = require('../common/http-response')

module.exports = class GetStudentRouter {
  constructor ({ studentUseCase } = {}) {
    this.studentUseCase = studentUseCase
  }

  async route () {
    try {
      const students = await this.studentUseCase.list()
      return HttpResponse.ok(students)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
