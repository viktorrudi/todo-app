const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  validateUser: (req, res, next) => {
    console.log('cookies in req utilities/validateuser):', req.cookies)
    jwt.verify(
      // Collected from browser cookies
      req.headers['x-access-token'],
      req.app.get(config.auth.secret),
      async (err, decoded) => {
        try {
          if (err) res.json({ status: 'error', err, data: null })
          req.body.userId = await decoded.id
          next()
        } catch {
          next()
          return
        }
      }
    )
  },
}
