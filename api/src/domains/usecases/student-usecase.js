const { MissingParamError, NotFoundError } = require('../../utils/errors')

module.exports = class StudentUseCase {
  constructor ({ studentRepository } = {}) {
    this.studentRepository = studentRepository
  }

  async get (id) {
    if (!id && id !== 0) throw new MissingParamError('ID')

    const result = await this.studentRepository.getById(id)
    if (!result) throw new NotFoundError(`Student with id '${id}'`)

    return result
  }
}
