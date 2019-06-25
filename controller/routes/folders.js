const router = require('express').Router()
let TodoFolder = require('../models/folder.model')
let TodoItem = require('../models/item.model')

// **** GET **** //

// Get all folders
router.route('/').get((req, res) => {
  TodoFolder.find((err, folders) => {
    if (err) throw new Error(err)
    res.json(folders)
  })
})

// Get specific folder
router.route('/').get((req, res) => {
  const id = req.params.id
  TodoFolder.findById(id, (err, folders) => {
    if (err) throw new Error(err)
    res.json(folders)
  })
})

// **** POST **** //

// Save new folder
router.route('/').post((req, res) => {
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

// **** DELETE **** //

// Delete folder
// TODO: Also delete all items in folder
router.route('/').delete((req, res) => {
  const folderID = req.query.id

  // Delete all items with related folder
  TodoItem.deleteMany({ folder: folderID }).catch(err => res.json(err))

  // Delete folder and log response
  TodoFolder.findByIdAndDelete(folderID)
    .then(folder => {
      res.status(200).json({ message: 'Folder and items deleted!', folder })
    })
    .catch(err => res.json(err))
})

// **** PATCH **** //

// Update folder name
router.route('/update-name').patch((req, res) => {
  TodoFolder.findById(req.query.id, (err, folder) => {
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

// Update folder color (unused)
router.route('/update-color').patch((req, res) => {
  TodoFolder.findById(req.query.id, (err, folder) => {
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

module.exports = router
