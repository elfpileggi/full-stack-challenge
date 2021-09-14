const { MissingParamError, ServerError } = require('../../utils/errors')
const FindBestStaffRouter = require('./find-best-staff-router')

const makeStaffUseCase = () => {
  class StaffUseCase {
    async findBest ({ skillId, level } = {}) {
      this.skillId = skillId
      this.level = level
      return this.staff
    }
  }

  const staffUseCaseSpy = new StaffUseCase()
  return staffUseCaseSpy
}

const makeSut = () => {
  const staffUseCaseSpy = makeStaffUseCase()
  const sut = new FindBestStaffRouter({ staffUseCase: staffUseCaseSpy })
  return {
    sut,
    staffUseCaseSpy
  }
}

describe('Find Best Staff Router', () => {
  test('Should return 400 if no Skill ID is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('Skill ID').message)
  })

  test('Should return 400 if no Skill ID is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { skill_id: 'no_number' }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('Skill ID').message)
  })

  test('Should return 400 if no ID is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { skill_id: 1 }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('Level').message)
  })

  test('Should return 400 if no ID is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { skill_id: 1, level: 'no_number' }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('Level').message)
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
    const sut = new FindBestStaffRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
  test('Should return 200 if valid parameters', async () => {
    const { sut, staffUseCaseSpy } = makeSut()
    staffUseCaseSpy.staff = {
      id: 'any_id',
      type: 'any_type'
    }
    const httpRequest = {
      params: {
        skill_id: '1',
        level: '1'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(staffUseCaseSpy.staff)
  })
})
