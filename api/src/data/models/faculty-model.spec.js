const sut = require('./faculty-model')

describe('Faculty Model', () => {
  test('Should call getBy with parameters and should return one result', async () => {
    const result = sut.getBy({ id: 1 })
    expect(result.length).toEqual(1)
  })

  test('Should call getBy without parameters and should return all results', async () => {
    const result = sut.getBy()
    expect(result.length).toEqual(2)
  })

  test('Should call getBy with empty parameters and should return all results', async () => {
    const result = sut.getBy({})
    expect(result.length).toEqual(2)
  })

  test('Should call getBy with one subject id and should return one result', async () => {
    const result = sut.getBy({ subject_ids: [1] })
    expect(result.length).toEqual(1)
  })
})
