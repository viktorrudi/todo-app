const router = require('express').Router()
let TodoFolder = require('../models/folder.model')
let TodoItem = require('../models/item.model')

// **** GET **** //

// Get all folders
router.route('/').get((req, res) => {
  const userID = req.headers['x-user-id']
  TodoFolder.find((err, todoFolders) => {
    if (err)
      return res.status(500).json({ message: 'Unable to retrieve folders' })
    const folders = todoFolders.filter(folder => folder.ownerID === userID)
    return res.status(200).json(folders)
  })
})

// Get specific folder
router.route('/').get((req, res) => {
  const id = req.params.id
  TodoFolder.findById(id, (err, folders) => {
    if (err) res.status(500).json({ message: 'Unable to retrieve folder' })
    return res.status(200).json(folders)
  })
})

// **** POST **** //

// Save new folder
router.route('/').post((req, res) => {
  const folder = new TodoFolder(req.body)
  folder
    .save()
    .then(folder => res.status(200).json({ message: 'Folder added!', folder }))
    .catch(err => res.status(400).json({ message: err.message }))
})

// **** DELETE **** //

// Delete folder
router.route('/').delete((req, res) => {
  const folderID = req.query.id

  // Delete all items with related folder
  TodoItem.deleteMany({ folder: folderID }).catch(err => res.json(err))

  // Delete folder and log response
  TodoFolder.findByIdAndDelete(folderID)
    .then(folder => {
      return res
        .status(200)
        .json({ message: 'Folder and items deleted!', folder })
    })
    .catch(err => res.json({ message: err.message }))
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
        return res.status(200).json({ message: 'Folder name updated!', folder })
      })
      .catch(err => {
        return res.status(400).json({ message: err.message })
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
        return res.json({ message: 'Folder color updated!', folder })
      })
      .catch(err => {
        return res.status(400).json({ message: err.message })
      })
  })
})

module.exports = router
