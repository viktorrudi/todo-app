const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')
const PORT = config.server.port

// Models
const TodoItem = require('./models/item.model')
const TodoFolder = require('./models/folder.model')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(config.db.uri, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', () => {
  console.log('connected to db')
})

app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT)
})

const todoRoutes = express.Router()
app.use('/api', todoRoutes)

///////////////////////

todoRoutes.route('/items').get((req, res) => {
  TodoItem.find((err, todos) => {
    if (err) throw new Error(err)
    res.json(todos)
  })
})

todoRoutes.route('/folders').get((req, res) => {
  TodoFolder.find((err, folders) => {
    if (err) throw new Error(err)
    res.json(folders)
  })
})

todoRoutes.route('/items:id').get((req, res) => {
  const id = req.params.id
  TodoItem.findById(id, (err, todo) => {
    if (err) throw new Error(err)
    res.json(todo)
  })
})

todoRoutes.route('/folders:id').get((req, res) => {
  const id = req.params.id
  TodoFolder.findById(id, (err, folders) => {
    if (err) throw new Error(err)
    res.json(folders)
  })
})

todoRoutes.route('/add-item').post((req, res) => {
  const todo = new TodoItem(req.body)
  console.log(todo)
  todo
    .save()
    .then(todo => {
      res.status(200).json({ message: 'Todo added!', todo })
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
})

todoRoutes.route('/add-folder').post((req, res) => {
  const folder = new TodoFolder(req.body)
  console.log(folder)
  folder
    .save()
    .then(folder => {
      res.status(200).json({ message: 'Folder added!', folder })
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
})

todoRoutes.route('/toggle-complete/:id').patch((req, res) => {
  TodoItem.findById(req.params.id, (err, todo) => {
    if (err) res.status(404).json(err)

    todo.completed = req.body.completed

    todo
      .save()
      .then(todo => {
        res.json({ message: 'Todo completed status updated!', todo })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  })
})

todoRoutes.route('/update-todo-text/:id').patch((req, res) => {
  TodoItem.findById(req.params.id, (err, todo) => {
    if (err) res.status(404).json(err)

    todo.text = req.body.text

    todo
      .save()
      .then(todo => {
        res.json({ message: 'Todo text updated!', todo })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  })
})

todoRoutes.route('/update-folder-name/:id').patch((req, res) => {
  TodoFolder.findById(req.params.id, (err, folder) => {
    if (err) res.status(404).json(err)

    folder.name = req.body.name

    folder
      .save()
      .then(folder => {
        res.json({ message: 'Folder name updated!', folder })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  })
})

todoRoutes.route('/update-todo-folder/:id').patch((req, res) => {
  TodoItem.findById(req.params.id, (err, todo) => {
    if (err) res.status(404).json(err)

    todo.folder = req.body.folder

    todo
      .save()
      .then(todo => {
        res.json({ message: 'Todo folder updated!', todo })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  })
})

todoRoutes.route('/update-folder-color/:id').patch((req, res) => {
  TodoFolder.findById(req.params.id, (err, folder) => {
    if (err) res.status(404).json(err)

    folder.color = req.body.color

    folder
      .save()
      .then(folder => {
        res.json({ message: 'Folder color updated!', folder })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  })
})

///////////////////////

process.once('SIGINT', () => app.stop())
process.once('SIGTERM', () => app.stop())
