const ListSkillRouter = require('../../presentation/routers/list-skill-router')
const SkillUseCase = require('../../domains/usecases/skill-usecase')
const studentRepository = require('../../data/repositories/student-repository')
const skillRepository = require('../../data/repositories/skill-repository')

module.exports = class ListSkillRouterComposer {
  static compose () {
    const skillUseCase = new SkillUseCase({
      studentRepository,
      skillRepository
    })
    return new ListSkillRouter({
      skillUseCase
    })
  }
}
