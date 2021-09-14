const { MissingParamError } = require("../../utils/errors")
const model = require("../models/skill-model")

module.exports = {
  getById: async (id) => {
    if (!id && id !== 0) throw new MissingParamError('ID')
    const list = model.getBy({ id })
    const result = list.length > 0 ? list[0] : null

    return result
  },
  getBySkills: async (skills = []) => {
    const result = skills.reduce((acc, skill) => {
      const cursor = model.getBy({ id: skill.id })
      const item = cursor.length > 0 ? cursor[0] : null
      return item ? [item, ...acc] : acc
    }, [])
    
    result.sort((a,b) => a.id - b.id)

    return result
  }
}