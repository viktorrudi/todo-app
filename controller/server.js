const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')
const PORT = config.server.port
const utilities = require('./utilities')

app.set('secretKey', config.auth.secret)

// Mongoose connection
mongoose
  .connect(config.db.uri, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to db')
  })
  .catch(err => console.log(err))

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
const itemsRouter = require('./routes/items')
const foldersRouter = require('./routes/folders')
const userController = require('./controllers/user')
// Private routes
app.use('/api/items', utilities.validateUser, itemsRouter)
app.use('/api/folders', utilities.validateUser, foldersRouter)
// Public routes
app.use('/api/register', userController.register)
app.use('/api/login', userController.authenticate)

// Connection test
// const connection = mongoose.connection
// connection.once('open', () => console.log('connected to db'))

// Connection init
app.listen(PORT, function () {
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
