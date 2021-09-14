const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../common/http-response')

module.exports = class ListSkillRouter {
  constructor ({ skillUseCase } = {}) {
    this.skillUseCase = skillUseCase
  }

  async route (httpRequest) {
    try {
      const params = httpRequest.params
      if (!params.student_id || isNaN(params.student_id)) return HttpResponse.badRequest(new MissingParamError('ID'))
      const skills = await this.skillUseCase.listByStudent(parseInt(params.student_id))
      return HttpResponse.ok(skills)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
