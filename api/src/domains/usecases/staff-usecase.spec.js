const { MissingParamError, NotFoundError } = require('../../utils/errors')
const StaffUseCase = require('./staff-usecase')

const makeSkillRepository = () => {
  class SkillRepository {
    async getById (id) {
      this.id = id
      return this.result
    }
  }

  const skillRepositorySpy = new SkillRepository()
  skillRepositorySpy.result = {
    id: 1,
    title: 'Algebra Skill',
    subject_id: 1
  }

  return skillRepositorySpy
}

const makeStudentRepository = () => {
  class StudentRepository {
    async getById (id) {
      this.id = id
      return this.student
    }

    async getBySkillIdAndHouseAndGreaterLevel (skillId, level) {
      this.skillId = skillId
      this.level = level
      return this.result
    }
  }

  const studentRepositorySpy = new StudentRepository()
  studentRepositorySpy.student = studentRepositorySpy.result = {
    id: 1,
    name: 'Tester',
    email: 'test@soraschools.com',
    house: 'Heqet',
    skills: [
      { id: 3, level: 2 },
      { id: 4, level: 3 },
      { id: 6, level: 1 }
    ]
  }

  return studentRepositorySpy
}

const makeFacultyRepository = () => {
  class FacultyRepository {
    async getById (id) {
      this.id = id
      return this.result
    }

    async getBySubjectId (subjectId) {
      this.subjectId = subjectId
      return this.result
    }
  }

  const facultyRepositorySpy = new FacultyRepository()
  facultyRepositorySpy.result = {
    id: 1,
    name: 'Michael Granado',
    subject_ids: [3, 4]
  }

  return facultyRepositorySpy
}

const makeSut = () => {
  const skillRepositorySpy = makeSkillRepository()
  const studentRepositorySpy = makeStudentRepository()
  const facultyRepositorySpy = makeFacultyRepository()
  const sut = new StaffUseCase({
    skillRepository: skillRepositorySpy,
    studentRepository: studentRepositorySpy,
    facultyRepository: facultyRepositorySpy
  })
  return {
    sut,
    skillRepositorySpy,
    studentRepositorySpy,
    facultyRepositorySpy
  }
}

describe('Staff UseCase', () => {
  describe('Calling get', () => {
    test('Should throw if required parameters are not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.get()
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if id is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.get()
      await expect(promise).rejects.toThrow(new MissingParamError('ID'))
    })

    test('Should throw if type is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.get(1)
      await expect(promise).rejects.toThrow(new MissingParamError('Type'))
    })

    test('Should return student as staff if required parameters are provided', async () => {
      const { sut, studentRepositorySpy } = makeSut()
      const result = await sut.get(1, 'student')
      expect(result.name).toEqual(studentRepositorySpy.result.name)
    })

    test('Should return faculty as staff if required parameters are provided', async () => {
      const { sut, facultyRepositorySpy } = makeSut()
      const result = await sut.get(1, 'faculty')
      expect(result.name).toEqual(facultyRepositorySpy.result.name)
    })

    test('Should throw if required parameters are provided but without results', async () => {
      const { sut, studentRepositorySpy, facultyRepositorySpy } = makeSut()
      studentRepositorySpy.result = null
      facultyRepositorySpy.result = null

      const promise = sut.get(1, 'any_type')
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if invalid dependencies are provided', async () => {
      const studentRepository = makeStudentRepository()
      const invalid = {}
      const suts = [].concat(
        new StaffUseCase(),
        new StaffUseCase({}),
        new StaffUseCase({
          studentRepository: invalid
        }),
        new StaffUseCase({
          studentRepository,
          facultyRepository: invalid
        })
      )
      for (const sut of suts) {
        const promise = sut.get({ skillId: 1, level: 0 })
        await expect(promise).rejects.toThrow()
      }
    })
  })

  describe('Calling findBest', () => {
    test('Should throw if required parameters are not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.findBest()
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if message is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.findBest({})
      await expect(promise).rejects.toThrow(new MissingParamError('Student ID'))
    })

    test('Should throw if message is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.findBest({ studentId: 1 })
      await expect(promise).rejects.toThrow(new MissingParamError('Skill ID'))
    })

    test('Should throw if message is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.findBest({ studentId: 1, skillId: 1 })
      await expect(promise).rejects.toThrow(new MissingParamError('Level'))
    })

    test('Should throw if skill is provided but not exists', async () => {
      const { sut, studentRepositorySpy } = makeSut()
      studentRepositorySpy.student = null

      const studentId = 0
      const promise = sut.findBest({ studentId, skillId: 0, level: 0 })
      await expect(promise).rejects.toThrow(new NotFoundError(`Student with id '${studentId}'`))
    })

    test('Should throw if skill is provided but not exists', async () => {
      const { sut, skillRepositorySpy } = makeSut()
      skillRepositorySpy.result = null

      const skillId = 0
      const promise = sut.findBest({ studentId: 1, skillId, level: 0 })
      await expect(promise).rejects.toThrow(new NotFoundError(`Skill with id '${skillId}'`))
    })

    test('Should return student if required parameters are provided', async () => {
      const { sut } = makeSut()
      const result = await sut.findBest({ studentId: 1, skillId: 1, level: 0 })
      expect(result.type).toEqual('student')
    })

    test('Should return faculty if required parameters are provided', async () => {
      const { sut, studentRepositorySpy } = makeSut()
      studentRepositorySpy.result = null

      const result = await sut.findBest({ studentId: 1, skillId: 1, level: 4 })
      expect(result.type).toEqual('faculty')
    })

    test('Should throw if required parameters are provided but anyone cannot answer', async () => {
      const { sut, studentRepositorySpy, facultyRepositorySpy } = makeSut()
      studentRepositorySpy.result = null
      facultyRepositorySpy.result = null

      const promise = sut.findBest({ studentId: 0, skillId: 0, level: 4 })
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if invalid dependencies are provided', async () => {
      const skillRepository = makeSkillRepository()
      const invalid = {}
      const suts = [].concat(
        new StaffUseCase(),
        new StaffUseCase({}),
        new StaffUseCase({
          skillRepository: invalid
        }),
        new StaffUseCase({
          skillRepository,
          studentRepository: invalid
        })
      )
      for (const sut of suts) {
        const promise = sut.findBest({ skillId: 1, level: 0 })
        await expect(promise).rejects.toThrow()
      }
    })
  })
})
