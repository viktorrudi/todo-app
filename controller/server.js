const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')
const PORT = config.server.port

// Mongoose connection
mongoose.connect(config.db.uri, { useNewUrlParser: true })
const connection = mongoose.connection

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
const itemsRouter = require('./routes/items')
const foldersRouter = require('./routes/folders')
app.use('/api/items', itemsRouter)
app.use('/api/folders', foldersRouter)

// Connection test
connection.once('open', () => console.log('connected to db'))
app.listen(PORT, function() {
  console.log('Server is running on port: ' + PORT)
})

process.once('SIGINT', () => app.stop())
process.once('SIGTERM', () => app.stop())
