const { MissingParamError, ServerError } = require('../../utils/errors')
const ListSkillRouter = require('./list-skill-router')

const makeSkillUseCase = () => {
  class SkillUseCase {
    async listByStudent (studentId) {
      this.studentId = studentId
      return this.skills
    }
  }

  const skillUseCaseSpy = new SkillUseCase()
  return skillUseCaseSpy
}

const makeSut = () => {
  const skillUseCaseSpy = makeSkillUseCase()
  const sut = new ListSkillRouter({ skillUseCase: skillUseCaseSpy })
  return {
    sut,
    skillUseCaseSpy
  }
}

describe('List Skill Router', () => {
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
  test('Should return 500 if no SkillUseCase is provided', async () => {
    const sut = new ListSkillRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
  test('Should return 200 if valid parameters', async () => {
    const { sut, skillUseCaseSpy } = makeSut()
    skillUseCaseSpy.skills = [
      {
        id: 3,
        title: "Biology Skill",
        subject_id: 2,
      },
      {
        id: 4,
        title: "Physics Skill",
        subject_id: 2,
      },
      {
        id: 6,
        title: "American History Skill",
        subject_id: 4,
      }
    ]
    const httpRequest = {
      params: {
        student_id: 'valid_student_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(skillUseCaseSpy.skills)
  })
})
