const { MissingParamError, ServerError } = require('../../utils/errors')
const ListStudentRouter = require('./list-student-router')

const makeStudentUseCase = () => {
  class StudentUseCase {
    async list () {
      return this.students
    }
  }

  const studentUseCaseSpy = new StudentUseCase()
  return studentUseCaseSpy
}

const makeSut = () => {
  const studentUseCaseSpy = makeStudentUseCase()
  const sut = new ListStudentRouter({ studentUseCase: studentUseCaseSpy })
  return {
    sut,
    studentUseCaseSpy
  }
}

describe('List Student Router', () => {
  test('Should return 500 if no StudentUseCase is provided', async () => {
    const sut = new ListStudentRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
  test('Should return 200 if valid parameters', async () => {
    const { sut, studentUseCaseSpy } = makeSut()
    studentUseCaseSpy.students = [
      {
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
    ]
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(studentUseCaseSpy.students)
  })
})
