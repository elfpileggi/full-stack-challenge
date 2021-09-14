const GetStudentRouter = require('../../presentation/routers/get-student-router')
const StudentUseCase = require('../../domains/usecases/student-usecase')
const StudentRepository = require('../../data/repositories/student-repository')

module.exports = class GetStudentRouterComposer {
  static compose () {
    const studentRepository = new StudentRepository()
    const studentUseCase = new StudentUseCase({
      studentRepository
    })
    return new GetStudentRouter({
      studentUseCase
    })
  }
}
