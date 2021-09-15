const sut = require('./object-helper')

describe('Object Helper', () => {
  describe('Calling isEmpty', () => {
    test('Should return true when empty object is provided', async () => {
      const result = sut.isEmpty({})
      expect(result).toBeTruthy()
    })

    test('Should return false when not empty object is provided', async () => {
      const result = sut.isEmpty({ foo: 'bar' })
      expect(result).toBeFalsy()
    })
  })
})
