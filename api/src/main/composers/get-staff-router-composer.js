const GetStaffRouter = require('../../presentation/routers/get-staff-router')
const StaffUseCase = require('../../domains/usecases/staff-usecase')
const StudentRepository = require('../../data/repositories/student-repository')
const FacultyRepository = require('../../data/repositories/faculty-repository')

module.exports = class GetStaffRouterComposer {
  static compose () {
    const studentRepository = new StudentRepository()
    const facultyRepository = new FacultyRepository()
    const staffUseCase = new StaffUseCase({
      studentRepository,
      facultyRepository
    })
    return new GetStaffRouter({
      staffUseCase
    })
  }
}
