const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  // User registration
  register: (req, res) => {
    console.log('starting registration')
    const { email, password } = req.body
    User.create({ email, password }, (err, result) => {
      if (err) {
        console.log('users.js register error:', err)
        res.status(400).json(err)
        return
      }
      console.log(result)
      res.status(201).json({ email: result.email, password: result.password })
      return
    })
  },

  // User login
  authenticate: (req, res) => {
    console.log(
      'attempting login with: ' + req.body.email + '. pw: ' + req.body.password
    )
    const { email, password } = req.body
    if (email && password) {
      User.findOne({ email }, async (err, user) => {
        console.log('found user:', user)
        if (err) res.status(500).json(err)
        // If password is correct, create token and send it back
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = await jwt.sign(
            // Paylod
            { id: user._id },
            // Secret
            req.app.get(config.auth.secret),
            // Options
            { expiresIn: config.auth.expireTime }
          )

          res.status(200).json({
            message: 'User found',
            // Also passing token to store in cookies (on frontend)
            data: { user, token },
          })

          return
        }
        // Wrong email or password
        res.status(401).json({ message: 'Wrong Email/Password', data: null })
      })
      return
    }
    res.status(400).json({ message: 'Email & Password fields are required' })
  },
  // User logout
  logout: (req, res) => {},
}
