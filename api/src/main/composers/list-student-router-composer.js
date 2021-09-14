const ListStudentRouter = require('../../presentation/routers/list-student-router')
const StudentUseCase = require('../../domains/usecases/student-usecase')
const StudentRepository = require('../../data/repositories/student-repository')

module.exports = class ListStudentRouterComposer {
  static compose () {
    const studentRepository = new StudentRepository()
    const studentUseCase = new StudentUseCase({
      studentRepository
    })
    return new ListStudentRouter({
      studentUseCase
    })
  }
}
