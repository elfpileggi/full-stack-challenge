const sut = require('./array-helper')

describe('Array Helper', () => {
  describe('Calling filterBy', () => {

    test('Should filter array when parameter is provided', () => {
      const array = [{ first_name: "James", last_name: "Bond" }]
      const result = sut.filterBy(array, { last_name: 'Bond' })
      expect(result).toEqual(array)
    })

    test('Should return all when empty parameter is provided', () => {
      const array = [
        { first_name: "James", last_name: "Bond" }, 
        { first_name: "Ethan", last_name: "Hunt" }
      ]
      const result = sut.filterBy(array, {})
      expect(result).toEqual(array)
    })

    test('Should return nothing when deph level parameter is provided', () => {
      const array = [
        { name: { first: "James", last: "Bond" } }, 
        { name: { first: "Ethan", last: "Hunt" } }
      ]
      const result = sut.filterBy(array, { name: { last: "Hunt" } })
      expect(result).toEqual([array[1]])
    })

  })
})