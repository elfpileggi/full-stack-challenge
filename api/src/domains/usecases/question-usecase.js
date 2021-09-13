const { MissingParamError } = require("../../utils/errors")

module.exports = class QuestionUseCase {
  async ask ({ message = '', skillId, recipient = { id: null, type: ''} } = {}) {
    if (message.length === 0) throw new MissingParamError('Message')
    if (!skillId) throw new MissingParamError('Skill Id')
    if (!recipient.id) throw new MissingParamError('Recipient Id')
    if (!recipient.type || recipient.type.length === 0) throw new MissingParamError('Recipient Type')

    return true
  }
}