const GetStudentRouter = require('../../presentation/routers/get-student-router')
const StudentUseCase = require('../../domains/usecases/student-usecase')
const studentRepository = require('../../data/repositories/student-repository')

module.exports = class GetStudentRouterComposer {
  static compose () {
    const studentUseCase = new StudentUseCase({
      studentRepository
    })
    return new GetStudentRouter({
      studentUseCase
    })
  }
}
