const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')
const utilities = require('./utilities')
const cookieParser = require('cookie-parser')
const log = require('./utilities/logger')
// Routes
const itemsRouter = require('./routes/items')
const foldersRouter = require('./routes/folders')
const userController = require('./controllers/user')

// Setting secret
// app.set('secretKey', config.auth.secret)

// Mongoose connection
mongoose
  .connect(config.db.uri, { useNewUrlParser: true })
  .then(() => {
    log.info('connected to db')
  })
  .catch(err => log.error(err))

// Middleware
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

// Private routes
app.use('/api/items', utilities.validateUser, itemsRouter)
app.use('/api/folders', utilities.validateUser, foldersRouter)
// Public routes
app.use('/api/register', userController.register)
app.use('/api/login', userController.login)
// Password reset routes
app.use('/api/user/request_password_reset', userController.requestPasswordReset)
// app.use('/api/user/check_reset_token', userController.checkResetToken)
app.use('/api/user/password_reset', userController.passwordReset)

// SERVER connection
app.listen(config.server.port, function () {
  log.info('Server is running on port: ' + config.server.port)
})

// Global error catcher
app.use((err, req, res, next) => {
  res.json(err)
})

// App stop
process.stdin.resume() //so the program will not close instantly

function exitHandler(options, exitCode) {
  if (options.cleanup) log.info('clean exit')
  if (exitCode || exitCode === 0) log.info(exitCode)
  if (options.exit) process.exit()
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }))

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }))

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }))
