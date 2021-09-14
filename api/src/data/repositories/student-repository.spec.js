const { MissingParamError } = require('../../utils/errors')
const sut = require('./student-repository')

describe('Student Repository', () => {
    
  describe('Calling getBySkillId', () => {

    test('Should throw if required parameters are not provided', async () => {
      const promise = sut.getBySkillId()
      await expect(promise).rejects.toThrow()
    })
    
    test('Should throw if id is not provided', async () => {
      const promise = sut.getBySkillId()
      await expect(promise).rejects.toThrow(new MissingParamError('Skill ID'))
    })

    test('Should return object if required parameters are provided', async () => {
      const expected = {
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
      const result = await sut.getBySkillId(3)
      expect(typeof result).toEqual('object')
      expect(result).toEqual(expected)
    })

    test('Should return null if required parameters are provided but no results', async () => {
      const result = await sut.getBySkillId(0)
      expect(result).toBeNull()
    })
    
  })

})
