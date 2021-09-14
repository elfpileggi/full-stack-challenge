const HttpResponse = require('./http-response')
const { ServerError, MissingParamError } = require('../../utils/errors')

console.error = jest.fn()

beforeEach(() => {
  console.error.mockClear()
})

describe('HttpResponse', () => {
  test('Should return 0 if call next', async () => {
    const httpResponse = HttpResponse.next()
    expect(httpResponse.statusCode).toBe(0)
  })

  test('Should return 200 if call ok', async () => {
    const body = { value: 'any_value' }
    const httpResponse = HttpResponse.ok(body)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe(body)
  })

  test('Should return 201 if call created', async () => {
    const body = { value: 'any_value' }
    const httpResponse = HttpResponse.created(body)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toBe(body)
  })

  test('Should return 400 if call badRequest', async () => {
    const httpResponse = HttpResponse.badRequest(new MissingParamError('object'))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('object').message)
  })

  test('Should return 500 if call serverError', async () => {
    const httpResponse = HttpResponse.serverError('any_error')
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 and write console log if call serverError in production', async () => {
    process.env.NODE_ENV = 'production'
    const httpResponse = HttpResponse.serverError('any_error')
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
})
