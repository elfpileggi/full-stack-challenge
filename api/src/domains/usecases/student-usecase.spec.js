const { MissingParamError } = require('../../utils/errors')
const StudentUseCase = require('./student-usecase')

const makeStudentRepository = () => {
  class StudentRepository {
    async getById (id) {
      this.id = id
      return this.result
    }

    async getAll () {
      return [this.result]
    }
  }

  const studentRepositorySpy = new StudentRepository()
  studentRepositorySpy.result = {
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

const makeSut = () => {
  const studentRepositorySpy = makeStudentRepository()
  const sut = new StudentUseCase({
    studentRepository: studentRepositorySpy
  })
  return {
    sut,
    studentRepositorySpy
  }
}

describe('Student UseCase', () => {
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

    test('Should return object if required parameters are provided', async () => {
      const { sut, studentRepositorySpy } = makeSut()
      const result = await sut.get(1)
      expect(result).toEqual(studentRepositorySpy.result)
    })

    test('Should throw if required parameters are provided but without result', async () => {
      const { sut, studentRepositorySpy } = makeSut()
      studentRepositorySpy.result = null
      const promise = sut.get(0)
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if invalid dependencies are provided', async () => {
      const invalid = {}
      const suts = [].concat(
        new StudentUseCase(),
        new StudentUseCase({}),
        new StudentUseCase({
          studentRepository: invalid
        })
      )
      for (const sut of suts) {
        const promise = sut.get(1)
        await expect(promise).rejects.toThrow()
      }
    })
  })
})
