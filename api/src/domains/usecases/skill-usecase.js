const { MissingParamError, NotFoundError } = require("../../utils/errors")

module.exports = class SkillUseCase {
  constructor({ skillRepository, studentRepository } = {}) {
    this.skillRepository = skillRepository
    this.studentRepository = studentRepository
  }

  async listByStudent (studentId) {
    if (!studentId && studentId !== 0) throw new MissingParamError('Student ID')
    
    const student = await this.studentRepository.getById(studentId)
    if (!student) throw new NotFoundError(`Student with id '${studentId}'`)

    const result = await this.skillRepository.getBySkills(student.skills)
    return result
  }
}