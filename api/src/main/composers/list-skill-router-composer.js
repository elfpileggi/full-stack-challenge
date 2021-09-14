const ListSkillRouter = require('../../presentation/routers/list-skill-router')
const SkillUseCase = require('../../domains/usecases/skill-usecase')
const StudentRepository = require('../../data/repositories/student-repository')
const SkillRepository = require('../../data/repositories/skill-repository')

module.exports = class ListSkillRouterComposer {
  static compose () {
    const studentRepository = new StudentRepository()
    const skillRepository = new SkillRepository()
    const skillUseCase = new SkillUseCase({
      studentRepository,
      skillRepository
    })
    return new ListSkillRouter({
      skillUseCase
    })
  }
}
