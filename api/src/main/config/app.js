const express = require('express')

const setupApp = require('./setup')
const setupRoutes = require('./routes')
const env = require('./env')

const app = express()

const Application = {
  start: async () => app.listen(env.port, () => console.log(`Server running at port ${env.port}`)),
  init: () => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json({ type: 'application/*+json' }))
    app.use(express.text({ type: 'text/html' }))
    app.set('trust proxy', true)

    setupApp(app)
    setupRoutes(app)

    return app
  }
}

module.exports = Application
