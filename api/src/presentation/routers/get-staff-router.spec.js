const { MissingParamError, ServerError } = require('../../utils/errors')
const GetStaffRouter = require('./get-staff-router')

const makeStaffUseCase = () => {
  class StaffUseCase {
    async get (id, type) {
      this.id = id
      this.type = type
      return this.staff
    }
  }

  const staffUseCaseSpy = new StaffUseCase()
  return staffUseCaseSpy
}

const makeSut = () => {
  const staffUseCaseSpy = makeStaffUseCase()
  const sut = new GetStaffRouter({ staffUseCase: staffUseCaseSpy })
  return {
    sut,
    staffUseCaseSpy
  }
}

describe('Get Staff Router', () => {
  test('Should return 400 if no ID is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('ID').message)
  })

  test('Should return 400 if no ID is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { id: 'no_number' }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('ID').message)
  })

  test('Should return 400 if no Type is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { id: 1 }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('Type').message)
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
  test('Should return 500 if no StaffUseCase is provided', async () => {
    const sut = new GetStaffRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
  test('Should return 200 if valid parameters', async () => {
    const { sut, staffUseCaseSpy } = makeSut()
    staffUseCaseSpy.staff = {
      id: 'any_id',
      type: 'any_type',
      name: 'any_name'
    }
    const httpRequest = {
      params: {
        id: '1',
        type: 'valid_type'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(staffUseCaseSpy.staff)
  })
})
