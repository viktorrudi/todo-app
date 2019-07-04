const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  validateUser: (req, res, next) => {
    console.log('validate user func')
    jwt.verify(
      req.headers['x-access-token'],
      req.app.get(config.auth.secret),
      async (err, decoded) => {
        try {
          if (err)
            res.json({ status: 'error', message: err.message, data: null })
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
