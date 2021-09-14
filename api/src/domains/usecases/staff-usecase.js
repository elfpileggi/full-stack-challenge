const { MissingParamError, NotFoundError } = require("../../utils/errors")

module.exports = class SkillUseCase {
  constructor({ facultyRepository, studentRepository } = {}) {
    this.facultyRepository = facultyRepository
    this.studentRepository = studentRepository
  }

  async get (id, type = '') {
    if (!id && id !== 0) throw new MissingParamError('ID')
    if (!type || type.length === 0) throw new MissingParamError('Type')

    let staff = null

    if (type === 'student') {
      const student = await this.studentRepository.getById(id)
      staff = { id, type, name: student.name }
    }
    
    if (type === 'faculty') {
      const faculty = await this.facultyRepository.getById(id)
      staff = { id, type, name: faculty.name }
    }

    if (!staff) throw new NotFoundError(`Staff with id '${id}' and type '${type}'`)
    return staff
  }
}