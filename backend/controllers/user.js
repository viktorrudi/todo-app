const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  // User registration
  register: (req, res) => {
    const { email, password } = req.body
    return User.findOne({ email }, (err, userExists) => {
      if (userExists) {
        return res.status(409).json({ message: 'User already exists!' })

      }
      User.create({ email, password }, (err, result) => {
        if (err) {
          return res.status(400).json({ message: err._message })

        }
        return res.status(201).json({ email: result.email, password: result.password })

      })
    })
  },

  // User login
  login: (req, res) => {
    console.log('LOGGING IN');
    const { email, password } = req.body
    if (email && password) {
      console.log('EMAIL AND PASSWORD FOUND');
      return User.findOne({ email }, async (err, user) => {
        console.log('STARTING FINDONE');
        if (err) {
          console.log('ENTERED FIRST ERROR_________:', err);
          return res.status(500).json(err)
        }
        // If password is correct, create token and send it back
        if (user && bcrypt.compareSync(password, user.password)) {
          console.log('PASSWORD CORRECT. SIGNING TOKEN');
          const token = await jwt.sign(
            // Paylod
            { id: user._id },
            // Secret
            req.app.get(config.auth.secret),
            // Options
            { expiresIn: config.auth.expireTime }
          )
          console.log('NOW GOING TO RETURN 200 WITH:', user, token);
          return res.status(200).json({
            message: 'User found',
            // Also passing token to store in cookies (on frontend)
            data: { user, token },
          })
        }
        console.log('INCORRECT USRNAME OR PW');
        // Wrong email or password
        return res.status(401).json({ message: 'Wrong Email/Password', data: null })
      })
    }
    console.log('INCORRECT FIELDS');
    return res.status(400).json({ message: 'Email & Password fields are required' })
  },

  // Reset password
  passwordReset: (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) return res.status(400).jsonn({ message: 'Email not found. Are you sure you registered?' })

      })

  }
}
