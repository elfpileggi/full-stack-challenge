const request = require('supertest')
const app = require('../config/app').init()

describe('Skill Routes', () => {
  describe('Call get student by id', () => {
    test('Should return 200 when valid parameters are provided', async () => {
      const id = 1
      await request(app).get(`/students/${id}`).expect(200)
    })
  })
})
