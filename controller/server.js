const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')
const PORT = config.server.port
const jwt = require('jsonwebtoken')

app.set(config.auth.secret, 'nodeRestApi')

// Mongoose connection
mongoose.connect(config.db.uri, { useNewUrlParser: true })
const connection = mongoose.connection

// Middleware
app.use(cors())
app.use(bodyParser.json())

// TODO: Move into a separate file
const validateUser = (req, res, next) => {
  jwt.verify(
    req.headers['x-access-token'],
    req.app.get(config.auth.secret),
    async (err, decoded) => {
      try {
        if (err) res.json({ status: 'error', message: err.message, data: null })
        req.body.userId = await decoded.id
        next()
      } catch {
        return
      }
    }
  )
}

// Routes
const itemsRouter = require('./routes/items')
const foldersRouter = require('./routes/folders')
const userController = require('./controllers/user')
// Private routes (TODO: set up validateUser)
app.use('/api/items', validateUser, itemsRouter)
app.use('/api/folders', validateUser, foldersRouter)
// Public routes
app.use('/api/register', userController.register)
app.use('/api/login', userController.authenticate)

// Connection test
connection.once('open', () => console.log('connected to db'))

// Connection init
app.listen(PORT, function() {
  console.log('Server is running on port: ' + PORT)
})

// App stop
process.stdin.resume() //so the program will not close instantly

function exitHandler(options, exitCode) {
  if (options.cleanup) console.log('clean exit')
  if (exitCode || exitCode === 0) console.log(exitCode)
  if (options.exit) process.exit()
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }))

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }))

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }))
