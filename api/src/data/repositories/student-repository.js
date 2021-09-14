const { MissingParamError } = require("../../utils/errors")
const model = require("../models/student-model")

module.exports = {
  getBySkillId: async (skillId) => {
    if (!skillId && skillId !== 0) throw new MissingParamError('Skill ID')
    const list = model.getBy({ skills: [{ id: skillId }] })
    const result = list.length > 0 ? list[0] : null

    return result
  },
}