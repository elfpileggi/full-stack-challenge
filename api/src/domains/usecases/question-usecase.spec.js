const { MissingParamError, NotFoundError } = require("../../utils/errors")
const QuestionUseCase = require("./question-usecase")

const makeSkillRepository = () => {
  class SkillRepository {
    async getById(id) {
      this.id = id
      return this.result
    }
  }

  const skillRepositorySpy = new SkillRepository()
  skillRepositorySpy.result = {
    id: 1,
    title: "Algebra Skill",
    subject_id: 1,
  }

  return skillRepositorySpy
}

const makeStudentRepository = () => {
  class StudentRepository {
    async getBySkillIdAndGreaterLevel(skillId, level) {
      this.skillId = skillId
      this.level = level
      return this.result
    }
  }

  const studentRepositorySpy = new StudentRepository()
  studentRepositorySpy.result = {
    id: 1,
    name: "Tester",
    email: "test@soraschools.com",
    house: "Heqet",
    skills: [
      { id: 3, level: 2 },
      { id: 4, level: 3 },
      { id: 6, level: 1 },
    ],
  }

  return studentRepositorySpy
}

const makeFacultyRepository = () => {
  class FacultyRepository {
    async getBySubjectId(subjectId) {
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
  const sut = new QuestionUseCase({
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

describe('Question UseCase', () => {


  describe('Calling Ask', () => {
    test('Should throw if required parameters are not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.ask()
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if message is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.ask({})
      await expect(promise).rejects.toThrow(new MissingParamError('Message'))
    })

    test('Should throw if skill id is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.ask({ message: 'some text here' })
      await expect(promise).rejects.toThrow(new MissingParamError('Skill ID'))
    })

    test('Should throw if recipient id is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.ask({ message: 'some text here', skillId: 1 })
      await expect(promise).rejects.toThrow(new MissingParamError('Staff ID'))
    })

    test('Should throw if recipient type is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.ask({ message: 'some text here', skillId: 1, staff: { id: 1 } })
      await expect(promise).rejects.toThrow(new MissingParamError('Staff Type'))
    })

    test('Should return true if required parameters are provided', async () => {
      const { sut } = makeSut()
      const result = await sut.ask({ message: 'some text here', skillId: 1, staff: { id: 1, type: 'student' } })
      expect(result).toBe(true)
    })
  })


  describe('Calling findBestStaff', () => {
    test('Should throw if required parameters are not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.findBestStaff()
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if message is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.findBestStaff({})
      await expect(promise).rejects.toThrow(new MissingParamError('Skill ID'))
    })

    test('Should throw if message is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.findBestStaff({ skillId: 1 })
      await expect(promise).rejects.toThrow(new MissingParamError('Level'))
    })

    test('Should throw if skill is provided but not exists', async () => {
      const { sut, skillRepositorySpy } = makeSut()
      skillRepositorySpy.result = null

      const skillId = 0
      const promise = sut.findBestStaff({ skillId, level: 0 })
      await expect(promise).rejects.toThrow(new NotFoundError(`Skill with id '${skillId}'`))
    })

    test('Should return student if required parameters are provided', async () => {
      const { sut } = makeSut()
      const result = await sut.findBestStaff({ skillId: 1, level: 0 })
      expect(result.type).toEqual('student')
    })

    test('Should return faculty if required parameters are provided', async () => {
      const { sut, studentRepositorySpy } = makeSut()
      studentRepositorySpy.result = null

      const result = await sut.findBestStaff({ skillId: 1, level: 4 })
      expect(result.type).toEqual('faculty')
    })

    test('Should throw if required parameters are provided but anyone cannot answer', async () => {
      const { sut, studentRepositorySpy, facultyRepositorySpy } = makeSut()
      studentRepositorySpy.result = null
      facultyRepositorySpy.result = null

      const promise = sut.findBestStaff({ skillId: 0, level: 4 })
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if invalid dependencies are provided', async () => {
      const skillRepository = makeSkillRepository()
      const invalid = {}
      const suts = [].concat(
        new QuestionUseCase(),
        new QuestionUseCase({}),
        new QuestionUseCase({
          skillRepository: invalid
        }),
        new QuestionUseCase({
          skillRepository,
          studentRepository: invalid
        })
      )
      for (const sut of suts) {
        const promise = sut.findBestStaff({ skillId: 1, level: 0 })
        await expect(promise).rejects.toThrow()
      }
    })
  })


})
