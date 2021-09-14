const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../common/http-response')

module.exports = class FindBestStaffRouter {
  constructor ({ staffUseCase } = {}) {
    this.staffUseCase = staffUseCase
  }

  async route (httpRequest) {
    try {
      const params = httpRequest.params
      if (!params.skill_id) return HttpResponse.badRequest(new MissingParamError('Skill ID'))
      if (!params.level) return HttpResponse.badRequest(new MissingParamError('Level'))
      const staff = await this.staffUseCase.findBest({ skillId: params.skill_id, level: params.level })
      return HttpResponse.ok(staff)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
