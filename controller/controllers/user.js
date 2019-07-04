const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  // User registration
  register: (req, res) => {
    const { email, password } = req.body
    User.create({ email, password }, (err, result) => {
      if (err) {
        console.log('oops')
        res.status(400).json(err)
        return
      }
      console.log(result)
      res.status(201).json({ message: 'User registered', data: null })
      return
    })
  },

  // User login
  authenticate: (req, res) => {
    console.log('attempting login with: ' + req.body.email + '. pw: ' + req.body.password);
    const { email, password } = req.body
    if (email && password) {
      User.findOne({ email }, async (err, user) => {
        console.log('found user:', user);
        if (err) res.status(500).json(err)
        // If password is correct, create token and send it back
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = await jwt.sign(
            { id: user._id },
            req.app.get(config.auth.secret),
            { expiresIn: config.auth.expireTime }
          )

          res.status(200).json({
            message: 'User found',
            data: { user: user, token },
          })
          // Todo: check if cookies are stored, check cookie expiration, store token in cookie
          return
        }
        // Wrong email or password
        res.status(401).json({ message: 'Wrong Email/Password', data: null })
      })
      return
    }
    res.status(400).json({ message: 'Email & Password fields are required' })
  },
}
