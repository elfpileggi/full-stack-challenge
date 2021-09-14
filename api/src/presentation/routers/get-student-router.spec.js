const { MissingParamError, ServerError } = require('../../utils/errors')
const GetStudentRouter = require('./get-student-router')

const makeStudentUseCase = () => {
  class StudentUseCase {
    async get (id) {
      this.id = id
      return this.student
    }
  }

  const studentUseCaseSpy = new StudentUseCase()
  return studentUseCaseSpy
}

const makeSut = () => {
  const studentUseCaseSpy = makeStudentUseCase()
  const sut = new GetStudentRouter({ studentUseCase: studentUseCaseSpy })
  return {
    sut,
    studentUseCaseSpy
  }
}

describe('Get Student Router', () => {
  test('Should return 400 if no ID is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('ID').message)
  })
  
  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
  test('Should return 500 if no StudentUseCase is provided', async () => {
    const sut = new GetStudentRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
  test('Should return 200 if valid parameters', async () => {
    const { sut, studentUseCaseSpy } = makeSut()
    studentUseCaseSpy.student = {
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
    const httpRequest = {
      params: {
        id: 'valid_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(studentUseCaseSpy.student)
  })
})
