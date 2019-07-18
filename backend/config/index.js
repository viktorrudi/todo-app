'use strict'

const dotenv = require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 4000,
    apiURI: 'http://localhost:4000/api'
  },
  db: {
    uri: process.env.DB_CONNECTION,
  },
  auth: {
    secret: 'secretKey',
    expireTime: '1h',
  },
  mailing: {
    service: 'gmail',
    from: process.env.MAILING_ACCOUNT,
    password: process.env.MAILING_PASSWORD,
    resetTimer: 36000
  }
}
