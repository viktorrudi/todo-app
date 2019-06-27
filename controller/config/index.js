'use strict'

const dotenv = require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 4000,
  },
  db: {
    uri: process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27018/todos',
  },
  auth: {
    secret: 'secretKey',
    expireTime: '1h',
  },
}
