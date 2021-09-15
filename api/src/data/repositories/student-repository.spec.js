const { MissingParamError } = require('../../utils/errors')
const sut = require('./student-repository')

describe('Student Repository', () => {
  describe('Calling getBySkillIdAndGreaterLevel', () => {
    test('Should throw if required parameters are not provided', async () => {
      const promise = sut.getBySkillIdAndGreaterLevel()
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if id is not provided', async () => {
      const promise = sut.getBySkillIdAndGreaterLevel()
      await expect(promise).rejects.toThrow(new MissingParamError('Skill ID'))
    })

    test('Should throw if id is not provided', async () => {
      const promise = sut.getBySkillIdAndGreaterLevel(1)
      await expect(promise).rejects.toThrow(new MissingParamError('Level'))
    })

    test('Should return object if required parameters are provided', async () => {
      const expected = {
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
      const result = await sut.getBySkillIdAndGreaterLevel(3, 1)
      expect(typeof result).toEqual('object')
      expect(result).toEqual(expected)
    })

    test('Should return null if required parameters are provided but with higher level', async () => {
      const result = await sut.getBySkillIdAndGreaterLevel(3, 4)
      expect(typeof result).toEqual('object')
      expect(result).toBeNull()
    })

    test('Should return null if required parameters are provided but no results', async () => {
      const result = await sut.getBySkillIdAndGreaterLevel(0, 0)
      expect(result).toBeNull()
    })
  })

  describe('Calling getById', () => {
    test('Should throw if required parameters are not provided', async () => {
      const promise = sut.getById()
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if id is not provided', async () => {
      const promise = sut.getById()
      await expect(promise).rejects.toThrow(new MissingParamError('ID'))
    })

    test('Should return object if required parameters are provided', async () => {
      const expected = {
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
      const result = await sut.getById(1)
      expect(typeof result).toEqual('object')
      expect(result).toEqual(expected)
    })

    test('Should return null if required parameters are provided but no results', async () => {
      const result = await sut.getById(0)
      expect(result).toBeNull()
    })
  })
})
