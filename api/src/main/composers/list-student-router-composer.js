const ListStudentRouter = require('../../presentation/routers/list-student-router')
const StudentUseCase = require('../../domains/usecases/student-usecase')
const studentRepository = require('../../data/repositories/student-repository')

module.exports = class ListStudentRouterComposer {
  static compose () {
    const studentUseCase = new StudentUseCase({
      studentRepository
    })
    return new ListStudentRouter({
      studentUseCase
    })
  }
}
