const FindBestStaffRouter = require('../../presentation/routers/find-best-staff-router')
const StaffUseCase = require('../../domains/usecases/staff-usecase')
const StudentRepository = require('../../data/repositories/student-repository')
const FacultyRepository = require('../../data/repositories/faculty-repository')
const SkillRepository = require('../../data/repositories/skill-repository')

module.exports = class FindBestStaffRouterComposer {
  static compose () {
    const studentRepository = new StudentRepository()
    const facultyRepository = new FacultyRepository()
    const skillRepository = new SkillRepository()
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
