const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const config = require('../config')

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email format',
    ],
  },
  password: { type: String, required: true },
  isDisabled: { type: Boolean, default: false },
  passwordResetToken: { type: String },
  passwordResetTokenExpires: { type: Date },
})

// Hashing password before storing it in the database. Not using arrow function because of "this" kw
userSchema.pre('save', function(next) {
  const user = this
  bcrypt.hash(user.password, config.auth.saltRounds, async (err, hash) => {
    if (err) next(err)
    user.password = await hash
    next()
  })
})

module.exports = mongoose.model('User', userSchema)
