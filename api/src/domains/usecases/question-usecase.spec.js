const { MissingParamError } = require("../../utils/errors")
const QuestionUseCase = require("./question-usecase")

const makeSut = () => {
  const sut = new QuestionUseCase()
  return {
    sut
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
      await expect(promise).rejects.toThrow(new MissingParamError('Skill Id'))
    })
  
    test('Should throw if recipient id is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.ask({ message: 'some text here', skillId: 1 })
      await expect(promise).rejects.toThrow(new MissingParamError('Staff Id'))
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
  
})
