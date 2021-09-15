module.exports = class RouterAdapter {
  static adapt (router) {
    return async (req, res, next) => {
      const httpRequest = {
        params: { ...req.body, ...req.query, ...req.params }
      }

      const httpResponse = await router.route(httpRequest)
      if (httpResponse.statusCode === 0) {
        next()
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }
  }
}
