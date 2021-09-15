const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../common/http-response')

module.exports = class FindBestStaffRouter {
  constructor ({ staffUseCase } = {}) {
    this.staffUseCase = staffUseCase
  }

  async route (httpRequest) {
    try {
      const params = httpRequest.params
      if (!params.student_id || isNaN(params.student_id)) return HttpResponse.badRequest(new MissingParamError('Student ID'))
      if (!params.skill_id || isNaN(params.skill_id)) return HttpResponse.badRequest(new MissingParamError('Skill ID'))
      if (!params.level || isNaN(params.level)) return HttpResponse.badRequest(new MissingParamError('Level'))
      const staff = await this.staffUseCase.findBest({ studentId: parseInt(params.student_id), skillId: parseInt(params.skill_id), level: parseInt(params.level) })
      return HttpResponse.ok(staff)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
