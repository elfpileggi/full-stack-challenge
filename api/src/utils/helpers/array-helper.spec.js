const sut = require('./array-helper')

describe('Array Helper', () => {
  describe('Calling filterBy', () => {

    test('Should filter array when parameter is provided', async () => {
      const array = [{ first_name: "James", last_name: "Bond" }]
      const result = sut.filterBy(array, { last_name: 'Bond' })
      expect(result).toEqual(array)
    })

    test('Should return all when empty parameter is provided', async () => {
      const array = [
        { first_name: "James", last_name: "Bond" }, 
        { first_name: "Ethan", last_name: "Hunt" }
      ]
      const result = sut.filterBy(array, {})
      expect(result).toEqual(array)
    })

    test('Should return item when object nested parameter is provided', async () => {
      const array = [
        { name: { first: "James", last: "Bond" } }, 
        { name: { first: "Ethan", last: "Hunt" } }
      ]
      const result = sut.filterBy(array, { name: { last: "Hunt" } })
      expect(result).toEqual([array[1]])
    })

    test('Should return item when array of objects parameter is provided', async () => {
      const array = [
        { 
          names: [
            { first: "James", last: "Bond" },
            { first: "Ethan", last: "Hunt" }
          ] 
        }
      ]
      const result = sut.filterBy(array, { names: [{ last: "Hunt" }] })
      expect(result).toEqual([array[0]])
    })

    test('Should return item when array parameter is provided', async () => {
      const array = [
        { 
          ids: [1, 2] 
        }
      ]
      const result = sut.filterBy(array, { ids: [1] })
      expect(result).toEqual([array[0]])
    })

    test('Should return item when array parameter is provided', async () => {
      const array = [
        { quantity: 5 }
      ]
      const result = sut.filterBy(array, { quantity: '>4' })
      expect(result).toEqual([array[0]])
    })

  })
})