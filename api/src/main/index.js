const app = require('./config/app')
const LogHelper = require('../utils/helpers/log-helper')

const start = async () => {
  try {
    app.init()
    await app.start()
  } catch (error) {
    LogHelper.error(error)
  }
}

start()
