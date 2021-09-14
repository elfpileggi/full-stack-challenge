const GetStaffRouter = require('../../presentation/routers/get-staff-router')
const StaffUseCase = require('../../domains/usecases/staff-usecase')
const studentRepository = require('../../data/repositories/student-repository')
const facultyRepository = require('../../data/repositories/faculty-repository')

module.exports = class GetStaffRouterComposer {
  static compose () {
    const staffUseCase = new StaffUseCase({
      studentRepository,
      facultyRepository
    })
    return new GetStaffRouter({
      staffUseCase
    })
  }
}
