const { MissingParamError, NotFoundError } = require('../../utils/errors')

module.exports = class SkillUseCase {
  constructor ({ skillRepository, facultyRepository, studentRepository } = {}) {
    this.skillRepository = skillRepository
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

  async findBest ({ studentId, skillId, level } = {}) {
    if (!studentId && studentId !== 0) throw new MissingParamError('Student ID')
    if (!skillId && skillId !== 0) throw new MissingParamError('Skill ID')
    if (!level && level !== 0) throw new MissingParamError('Level')

    const sessionStudent = await this.studentRepository.getById(studentId)
    if (!sessionStudent) throw new NotFoundError(`Student with id '${studentId}'`)

    const skill = await this.skillRepository.getById(skillId)
    if (!skill) throw new NotFoundError(`Skill with id '${skillId}'`)

    const student = await this.studentRepository.getBySkillIdAndHouseAndGreaterLevel(skillId, sessionStudent.house, level)
    if (student) return { id: student.id, type: 'student' }

    const faculty = await this.facultyRepository.getBySubjectId(skill.subject_id)
    if (faculty) return { id: faculty.id, type: 'faculty' }

    throw new NotFoundError(`No responsable for '${skill.title}'`)
  }
}
