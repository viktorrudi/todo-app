const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  validateUser: (req, res, next) => {
    // console.log('validateuser func (util):', req.headers)
    jwt.verify(
      // Collected from browser cookies
      req.headers['x-access-token'],
      req.app.get(config.auth.secret),
      async (err, decoded) => {
        try {
          req.body.userId = await decoded.id
          next()
        } catch (err) {
          // throw new Error({ message: 'Login timed out, please login again' })
          res.status(409).json({
            message: 'Login timed out, please login again',
            type: err.name,
          })

          next()
          // return
        }
      }
    )
  },
}
