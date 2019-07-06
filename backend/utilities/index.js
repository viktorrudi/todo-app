const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  validateUser: (req, res, next) => {
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
  findUserID: req => {
    const tokenCookie = req.headers['x-access-token']
    const base64Token = tokenCookie.split('.')[1]
    const tokenObject = Buffer.from(base64Token, 'base64')
    const { id } = JSON.parse(tokenObject)
    return id
  },
}
