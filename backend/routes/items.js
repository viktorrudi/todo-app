const router = require('express').Router()
let TodoItem = require('../models/item.model')

// **** GET **** //

// Get all items for the user
router.route('/').get((req, res) => {
  // FIXME: Returns undefined on first login + register =?
  const userID = req.headers['x-user-id']
  console.log('getting all items. UserID from header:', userID)

  TodoItem.find((err, todoItems) => {
    if (err) res.status(404).json({ message: 'Unable to retrieve items' })
    const items = todoItems.filter(item => item.ownerID === userID)
    res.json(items)
  })
})

// Get specific item for the user
router.route('/').get((req, res) => {
  const id = req.params.id

  TodoItem.findById(id, (err, todo) => {
    if (err) res.status(404).json({ message: "Couldn't find item" })
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
      console.log('saved todo item: ', todo)
    })
    .catch(err => {
      // FIXME, not receiving token in header on first attempt
      console.log(
        '__________error adding item: ',
        err,
        '__________error ITEMS.JS (BACKEND) HHHHEADERS:',
        req.headers
      )
      res.status(400).json({ message: err.message })
      return
    })
})

// **** DELETE **** //

// Delete item
router.route('/').delete((req, res) => {
  TodoItem.findByIdAndDelete(req.query.id)
    .then(item => {
      res.status(200).json({ message: 'Todo deleted!', item })
    })
    .catch(err => res.json({ message: err.message }))
})

// Delete all items
router.route('/all').delete((req, res) => {
  TodoItem.deleteMany({})
    .then(item => {
      res.status(200).json({ message: 'All items deleted!', item })
    })
    .catch(err => res.json({ message: err.message }))
})

// **** PATCH **** //

// Set item completion status
router.route('/update-status').patch((req, res) => {
  TodoItem.findById(req.query.id, (err, todo) => {
    if (err) res.status(404).json({ message: "Couldn't find item to update" })

    todo.completed = req.body.completed

    todo
      .save()
      .then(todo => {
        res.json({ message: 'Todo completed status updated!', todo })
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  })
})

// Toggle important status of item
router.route('/update-important').patch((req, res) => {
  TodoItem.findById(req.query.id, (err, todo) => {
    if (err) res.status(404).json({ message: "Couldn't find item to update" })

    todo.important = req.body.important

    todo
      .save()
      .then(todo => {
        res.json({ message: 'Todo important status updated!', todo })
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  })
})

// Update todo text
router.route('/update-text').patch((req, res) => {
  TodoItem.findById(req.query.id, (err, todo) => {
    if (err) res.status(404).json({ message: "Couldn't find item to update" })

    todo.text = req.body.text

    todo
      .save()
      .then(todo => {
        res.json({ message: 'Todo text updated!', todo })
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  })
})

// Update which folder the item belongs to
router.route('/update-folder').patch((req, res) => {
  TodoItem.findById(req.query.id, (err, todo) => {
    if (err) res.status(404).json({ message: "Couldn't find item to update" })

    todo.folder = req.body.folder

    todo
      .save()
      .then(todo => {
        res.json({ message: 'Todo folder updated!', todo })
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  })
})

module.exports = router
