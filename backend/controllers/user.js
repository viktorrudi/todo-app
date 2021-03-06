const bcrypt = require('bcrypt')
const log = require('../utilities/logger')
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
        log.info('User created:', email)
        return res.status(201).json({ email, password })
      })
    })
  },

  // User login
  login: (req, res) => {
    const { email, password } = req.body
    if (email && password) {
      User.findOne({ email }, async (err, user) => {
        if (!user) {
          // Wrong email or password
          log.info('User attempted login, but with incorrect details:', email)

          return res
            .status(401)
            .json({ message: 'Wrong Email/Password', data: null })
        }
        if (err) return res.status(500).json(err)
        if (user.isDisabled) {
          log.info('Disabled user attempted login', email)
          return res.status(401).json({
            message: 'Your account is disabled.',
          })
        }

        // If password is correct, create token and send
        // it back to be stored in a cookie
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = await jwt.sign(
            // Paylod
            { id: user._id },
            // Secret
            req.app.get(config.auth.secret),
            // Options
            { expiresIn: config.auth.expireTime }
          )
          log.info('User logging in:', user.email)
          return res.status(200).json({
            message: 'User found',
            // Also passing token to store in cookies (on frontend)
            data: { user, token },
          })
        }
      })
    } else {
      log.error('Error on login, missing email/password field')
      return res
        .status(400)
        .json({ message: 'Email & Password fields are required' })
    }
  },

  // Reset password initializing (storing token in DB and sending it via email)
  requestPasswordReset: (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          log.info(
            'User attempted password reset with invaid email:',
            req.body.email
          )
          return res
            .status(400)
            .json({ message: 'Email not found. Are you sure you registered?' })
        }

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
          .then(() => {
            log.info('Sending reset token to user:', req.body.email)
            // Send password reset message
            mailing.passwordResetRequest(req, res, token)
          })
          .catch(err => {
            log.error('Error updating user with password reset token:', err)
            return res.status(500).json({ message: err })
          })
      })
      .catch(err => {
        log.error(
          'Unable to find user with email inserted for password reset:',
          err
        )
        return res.status(500).json({ message: err })
      })
  },

  // Checking password sent token if it matches with DB, update new password
  // ?passwordResetToken=token
  // request body: email, new password
  passwordReset: (req, res) => {
    const newPassword = req.body.password
    const emailRequester = req.body.email
    const passwordResetToken = req.query.passwordResetToken

    if (!emailRequester || !newPassword || !passwordResetToken) {
      log.error(
        'Password reset error: Missing email, password or reset password token'
      )
      return res
        .status(400)
        .json({ message: 'Missing email, password or reset password token' })
    }
    // Find user from password reset token
    User.findOne({
      email: emailRequester,
      passwordResetToken,
    })
      .then(user => {
        // Using .getTime() because Mongoose stores it as ISO string
        const validToken = user.passwordResetTokenExpires.getTime() > Date.now()
        // Checking if token is found and if its not expired yet
        if (!user || !validToken) {
          log.info('User attempted reset with invalid/expired token')
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
            )
              .then(() => {
                log.info('User updated password:', emailRequester)
                // Send back a response with updated info
                return res.status(200).json({
                  message: 'Password updated',
                  email: emailRequester,
                  password: hashedPassword,
                })
              })
              .catch(err => {
                log.info('Error updating user with resetted password:', err)
                return res
                  .status(500)
                  .json({ message: 'Oops, something happened' })
              })
          })
          .catch(err => {
            log.error('Error hashing password in password reset:', err)
            return res
              .status(500)
              .json({ message: 'Error hashing password', error: err })
          })
      })
      .catch(err => {
        log.error('Error finding reset token with email in database:', err)
        return res
          .status(400)
          .json({ message: 'Invalid or expired reset link', error: err })
      })
  },
}
