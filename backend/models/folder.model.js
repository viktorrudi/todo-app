const mongoose = require('mongoose')
const Schema = mongoose.Schema

let folderSchema = new Schema({
  ownerID: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
})

module.exports = mongoose.model('folders', folderSchema)
