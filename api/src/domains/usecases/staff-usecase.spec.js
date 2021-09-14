const { MissingParamError, NotFoundError } = require("../../utils/errors")
const StaffUseCase = require("./staff-usecase")

const makeStudentRepository = () => {
  class StudentRepository {
    async getById(id) {
      this.id = id
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
    async getById(id) {
      this.id = id
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
  const studentRepositorySpy = makeStudentRepository()
  const facultyRepositorySpy = makeFacultyRepository()
  const sut = new StaffUseCase({
    studentRepository: studentRepositorySpy,
    facultyRepository: facultyRepositorySpy
  })
  return {
    sut,
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


})
