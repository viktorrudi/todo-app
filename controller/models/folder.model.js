const mongoose = require('mongoose')
const Schema = mongoose.Schema

let folderSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
})

module.exports = mongoose.model('folders', folderSchema)
