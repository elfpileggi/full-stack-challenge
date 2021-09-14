const { MissingParamError, NotFoundError } = require("../../utils/errors")

module.exports = class QuestionUseCase {

  async ask ({ message = '', skillId, staff = { id: null, type: ''} } = {}) {
    if (message.length === 0) throw new MissingParamError('Message')
    if (!skillId) throw new MissingParamError('Skill ID')
    if (!staff.id) throw new MissingParamError('Staff ID')
    if (!staff.type || staff.type.length === 0) throw new MissingParamError('Staff Type')

    return true
  }
  
}