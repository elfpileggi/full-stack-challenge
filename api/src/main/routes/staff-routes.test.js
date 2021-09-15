const request = require('supertest')
const app = require('../config/app').init()

describe('Staff Routes', () => {
  describe('Call get staff', () => {
    test('Should return 200 when valid parameters are provided', async () => {
      const id = 1
      const type = 'student'
      await request(app).get(`/staff/${type}/${id}`).expect(200)
    })
  })

  describe('Call find best recommended staff', () => {
    test('Should return 200 when valid parameters are provided', async () => {
      const studentId = 1
      const skillId = 1
      const level = 1
      await request(app).get(`/staff/best/${skillId}/${level}/student/${studentId}`).expect(200)
    })
  })
})
