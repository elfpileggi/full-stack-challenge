const request = require('supertest')
const app = require('../config/app').init()

describe('Skill Routes', () => {
  describe('Call get skills by student id', () => {
    test('Should return 200 when valid parameters are provided', async () => {
      const studentId = 1
      await request(app).get(`/student/${studentId}/skills`).expect(200)
    })
  })
})
