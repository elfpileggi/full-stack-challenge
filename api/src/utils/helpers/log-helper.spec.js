const LogHelper = require('./log-helper')

describe('Log Helper', () => {
  const envDefault = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...envDefault }
  })

  afterAll(() => {
    process.env = envDefault
  })

  test('Should write the error log if is in prod env', async () => {
    const sut = LogHelper
    console.error = jest.fn()
    process.env.NODE_ENV = 'production'
    await sut.error('any_error')
    expect(console.error).toHaveBeenCalledWith('any_error')
  })

  test('Should write the error log if is in dev env', async () => {
    const sut = LogHelper
    console.error = jest.fn()
    process.env.NODE_ENV = 'development'
    await sut.error('any_error')
    expect(console.error).toHaveBeenCalledWith('any_error')
  })

  test('Should NOT write the error log if is in test env', async () => {
    const sut = LogHelper
    console.error = jest.fn()
    process.env.NODE_ENV = 'test'
    await sut.error('any_error')
    expect(console.error.mock.calls.length).toBe(0)
  })
})
