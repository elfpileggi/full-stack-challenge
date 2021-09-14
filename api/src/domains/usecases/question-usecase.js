const { MissingParamError, NotFoundError } = require("../../utils/errors")

module.exports = class QuestionUseCase {
  constructor({ skillRepository, studentRepository, facultyRepository } = {}) {
    this.skillRepository = skillRepository
    this.studentRepository = studentRepository
    this.facultyRepository = facultyRepository
  }

  async ask ({ message = '', skillId, staff = { id: null, type: ''} } = {}) {
    if (message.length === 0) throw new MissingParamError('Message')
    if (!skillId) throw new MissingParamError('Skill ID')
    if (!staff.id) throw new MissingParamError('Staff ID')
    if (!staff.type || staff.type.length === 0) throw new MissingParamError('Staff Type')

    return true
  }

  async findBestStaff ({ skillId, level } = {}) {
    if (!skillId && skillId !== 0) throw new MissingParamError('Skill ID')
    if (!level && level !== 0) throw new MissingParamError('Level')

    const skill = await this.skillRepository.getById(skillId)
    if (!skill) throw new NotFoundError(`Skill with id '${skillId}'`)

    const student = await this.studentRepository.getBySkillIdAndGreaterLevel(skillId, level)
    if (student) return { id: student.id, type: 'student' }

    const faculty = await this.facultyRepository.getBySubjectId(skill.subject_id)
    if (faculty) return { id: faculty.id, type: 'faculty' }

    throw new NotFoundError(`No responsable for the skill '${skill.title}'`)
  }
}