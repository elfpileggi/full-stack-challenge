const { MissingParamError } = require('../../utils/errors')
const sut = require('./skill-repository')

describe('Skill Repository', () => {
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
        title: 'Algebra Skill',
        subject_id: 1
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

  describe('Calling getBySkills', () => {
    test('Should return object if required parameters are provided', async () => {
      const expected = [
        {
          id: 3,
          title: 'Biology Skill',
          subject_id: 2
        },
        {
          id: 4,
          title: 'Physics Skill',
          subject_id: 2
        },
        {
          id: 6,
          title: 'American History Skill',
          subject_id: 4
        }
      ]
      const result = await sut.getBySkills([{ id: 3 }, { id: 4 }, { id: 6 }])
      expect(typeof result).toEqual('object')
      expect(result).toEqual(expected)
    })

    test('Should return empty array if required parameters are provided but no results', async () => {
      const result = await sut.getBySkills([{ id: 0 }])
      expect(result).toEqual([])
    })

    test('Should return empty array if required parameters are not provided', async () => {
      const result = await sut.getBySkills()
      expect(result).toEqual([])
    })
  })
})
