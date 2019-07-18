const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const mailing = require('../mailing')
const config = require('../config')

module.exports = {
  // User registration
  register: (req, res) => {
    const { email, password } = req.body
    return User.findOne({ email }, (err, userExists) => {
      if (userExists) {
        return res.status(409).json({ message: 'User already exists!' })
      }
      User.create({ email, password }, (err, { email, password }) => {
        if (err) return res.status(400).json({ message: err._message })
        return res.status(201).json({ email, password })
      })
    })
  },

  // User login
  login: (req, res) => {
    console.log('LOGGING IN')
    const { email, password } = req.body
    if (email && password) {
      console.log('EMAIL AND PASSWORD FOUND')
      return User.findOne({ email }, async (err, user) => {
        console.log('STARTING FINDONE')
        if (err) {
          console.log('ENTERED FIRST ERROR_________:', err)
          return res.status(500).json(err)
        }
        // If password is correct, create token and send it back
        if (user && bcrypt.compareSync(password, user.password)) {
          console.log('PASSWORD CORRECT. SIGNING TOKEN')
          const token = await jwt.sign(
            // Paylod
            { id: user._id },
            // Secret
            req.app.get(config.auth.secret),
            // Options
            { expiresIn: config.auth.expireTime }
          )
          console.log('NOW GOING TO RETURN 200 WITH:', user, token)
          return res.status(200).json({
            message: 'User found',
            // Also passing token to store in cookies (on frontend)
            data: { user, token },
          })
        }
        console.log('INCORRECT USRNAME OR PW')
        // Wrong email or password
        return res
          .status(401)
          .json({ message: 'Wrong Email/Password', data: null })
      })
    }
    console.log('INCORRECT FIELDS')
    return res
      .status(400)
      .json({ message: 'Email & Password fields are required' })
  },

  // Reset password initializing (storing token in DB and sending it via email)
  requestPasswordReset: (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user)
          return res
            .status(400)
            .json({ message: 'Email not found. Are you sure you registered?' })
        const token = crypto.randomBytes(20).toString('hex')

        User.update(
          // Matches user with email
          { email: user.email },
          // Adds token and expiration time
          {
            passwordResetToken: token,
            passwordResetTokenExpires: Date.now() + config.mailing.resetTimer,
          }
        )
          .then(user => {
            // Send password reset message
            mailing.passwordResetRequest(req, res, user, token)
          })
          .catch(err => res.status(500).json({ message: err }))
      })
      .catch(err => res.status(500).json({ message: err }))
  },

  // Checking password sent token if it matches with DB, update new password
  // ?passwordResetToken=token
  // request body: email, new password
  passwordReset: (req, res) => {
    const newPassword = req.body.password
    const emailRequester = req.body.email

    if (!emailRequester || !newPassword || !req.query.passwordResetToken) {
      return res
        .status(400)
        .json({ message: 'Missing email, password or reset password token' })
    }
    // Find user from password reset token
    User.findOne({
      passwordResetToken: req.query.passwordResetToken,
    })
      .then(user => {
        // Using .getTime() because Mongoose stores it as ISO string
        const validToken = user.passwordResetTokenExpires.getTime() > Date.now()
        // Checking if token is found and if its not expired yet
        if (!user || !validToken) {
          return res
            .status(400)
            .json({ message: 'Invalid or expired reset link' })
        }

        // Hash new password and update the user
        bcrypt
          .hash(newPassword, config.auth.saltRounds)
          .then(hashedPassword => {
            User.update(
              // Matches user with email
              { email: user.email },
              // Update user with password, clears token and timer
              {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetTokenExpires: null,
              }
            ).then(() => {
              // Send back a response with updated info
              return res.status(200).json({
                message: 'Password updated',
                email: emailRequester,
                password: hashedPassword,
              })
            })
          })
          .catch(err =>
            res
              .status(500)
              .json({ message: 'Error hashing password', error: err })
          )
      })
      .catch(err =>
        res
          .status(500)
          .json({ message: 'Invalid or expired reset link', error: err })
      )
  },
}
