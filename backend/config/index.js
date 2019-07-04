'use strict'

// FIXME: Env file not loaded in
const dotenv = require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 4000,
  },
  db: {
    uri: process.env.DB_CONNECTION,
  },
  auth: {
    secret: 'secretKey',
    expireTime: '1h',
  },
}
