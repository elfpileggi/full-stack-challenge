const { MissingParamError } = require("../../utils/errors")
const model = require("../models/skill-model")

module.exports = {
  getById: async (id) => {
    if (!id && id !== 0) throw new MissingParamError('ID')
    const list = model.getBy({ id })
    const result = list.length > 0 ? list[0] : null

    return result
  },
}