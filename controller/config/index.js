'use strict'

// FIXME: Env file not loaded in
const dotenv = require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 4000,
  },
  db: {
    // uri: process.env.DB_CONNECTION,
    uri: 'mongodb+srv://admin:NkiYUSIVrzL1dCWl@todoapp-mxq6h.mongodb.net/todo-app?retryWrites=true&w=majority',
  },
  auth: {
    secret: 'secretKey',
    expireTime: '1h',
  },
}
