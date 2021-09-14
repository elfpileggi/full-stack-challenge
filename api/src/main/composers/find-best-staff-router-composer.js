const FindBestStaffRouter = require('../../presentation/routers/find-best-staff-router')
const StaffUseCase = require('../../domains/usecases/staff-usecase')
const studentRepository = require('../../data/repositories/student-repository')
const facultyRepository = require('../../data/repositories/faculty-repository')
const skillRepository = require('../../data/repositories/skill-repository')

module.exports = class FindBestStaffRouterComposer {
  static compose () {
    const staffUseCase = new StaffUseCase({
      studentRepository,
      facultyRepository,
      skillRepository
    })
    return new FindBestStaffRouter({
      staffUseCase
    })
  }
}
