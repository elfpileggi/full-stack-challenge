const { MissingParamError } = require("../../utils/errors")
const model = require("../models/faculty-model")

module.exports = {
  getBySubjectId: async (subjectId) => {
    if (!subjectId && subjectId !== 0) throw new MissingParamError('Subject ID')
    const list = model.getBy({ subject_ids: [subjectId] })
    const result = list.length > 0 ? list[0] : null

    return result
  },
}