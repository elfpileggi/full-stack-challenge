const { MissingParamError } = require('../../utils/errors')
const sut = require('./faculty-repository')

describe('Faculty Repository', () => {
    
  describe('Calling getBySubjectId', () => {

    test('Should throw if required parameters are not provided', async () => {
      const promise = sut.getBySubjectId()
      await expect(promise).rejects.toThrow()
    })
    
    test('Should throw if id is not provided', async () => {
      const promise = sut.getBySubjectId()
      await expect(promise).rejects.toThrow(new MissingParamError('Subject ID'))
    })

    test('Should return object if required parameters are provided', async () => {
      const expected = {
        id: 1,
        name: 'Michael Granado',
        subject_ids: [3, 4]
      }
      const result = await sut.getBySubjectId(3)
      expect(typeof result).toEqual('object')
      expect(result).toEqual(expected)
    })

    test('Should return null if required parameters are provided but no results', async () => {
      const result = await sut.getBySubjectId(0)
      expect(result).toBeNull()
    })
    
  })

})
