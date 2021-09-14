module.exports = class LogHelper {
  static async error (error) {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  }
}
