const { MissingParamError } = require('../../utils/errors')
const model = require('../models/student-model')

module.exports = {
  getBySkillIdAndHouseAndGreaterLevel: async (skillId, house, level) => {
    if (!skillId && skillId !== 0) throw new MissingParamError('Skill ID')
    if (!level && level !== 0) throw new MissingParamError('Level')
    const list = model.getBy({ skills: [{ id: skillId, level: `>${level}` }] })

    /* istanbul ignore next */
    list.sort((a, b) => {
      if (a.house === house && a.id < b.id) return -1
      if (b.house === house && a.id > b.id) return 1
      return 0
    })

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
