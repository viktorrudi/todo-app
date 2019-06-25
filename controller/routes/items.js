const router = require('express').Router()
let TodoItem = require('../models/item.model')

// **** GET **** //

// Get all items
router.route('/').get((req, res) => {
  TodoItem.find((err, todos) => {
    if (err) throw new Error(err)
    res.json(todos)
  })
})

// Get specific item
router.route('/').get((req, res) => {
  const id = req.params.id

  TodoItem.findById(id, (err, todo) => {
    if (err) throw new Error(err)
    res.json(todo)
  })
})

// **** POST **** //

// Save new item
router.route('/').post((req, res) => {
  const todo = new TodoItem(req.body)

  todo
    .save()
    .then(todo => {
      res.status(200).json({ message: 'Todo added!', todo })
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
})

// **** DELETE **** //

// Delete item
router.route('/').delete((req, res) => {
  TodoItem.findByIdAndDelete(req.query.id)
    .then(item => {
      res.status(200).json({ message: 'Todo deleted!', item })
    })
    .catch(err => res.json(err))
})

// Delete all items
router.route('/all').delete((req, res) => {
  TodoItem.deleteMany({})
    .then(item => {
      res.status(200).json({ message: 'All items deleted!', item })
    })
    .catch(err => res.json(err))
})

// **** PATCH **** //

// Set item completion status
router.route('/update-status').patch((req, res) => {
  TodoItem.findById(req.query.id, (err, todo) => {
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

// Update todo text
router.route('/update-text').patch((req, res) => {
  TodoItem.findById(req.query.id, (err, todo) => {
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

// Update which folder the item belongs to
router.route('/update-folder').patch((req, res) => {
  TodoItem.findById(req.query.id, (err, todo) => {
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

module.exports = router
