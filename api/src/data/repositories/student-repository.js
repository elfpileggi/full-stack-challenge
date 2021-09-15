const { MissingParamError } = require('../../utils/errors')
const model = require('../models/student-model')

module.exports = {
  getBySkillIdAndGreaterLevel: async (skillId, level) => {
    if (!skillId && skillId !== 0) throw new MissingParamError('Skill ID')
    if (!level && level !== 0) throw new MissingParamError('Level')
    const list = model.getBy({ skills: [{ id: skillId, level: `>${level}` }] })
    const result = list.length > 0 ? list[0] : null

    return result
  },
  getById: async (id) => {
    if (!id && id !== 0) throw new MissingParamError('ID')
    const list = model.getBy({ id })
    const result = list.length > 0 ? list[0] : null

    return result
  }
}
