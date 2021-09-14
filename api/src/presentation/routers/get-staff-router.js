const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../common/http-response')

module.exports = class GetStaffRouter {
  constructor ({ staffUseCase } = {}) {
    this.staffUseCase = staffUseCase
  }

  async route (httpRequest) {
    try {
      const { id, type } = httpRequest.params
      if (!id || isNaN(id)) return HttpResponse.badRequest(new MissingParamError('ID'))
      if (!type) return HttpResponse.badRequest(new MissingParamError('Type'))
      const staff = await this.staffUseCase.get(parseInt(id), type)
      return HttpResponse.ok(staff)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
