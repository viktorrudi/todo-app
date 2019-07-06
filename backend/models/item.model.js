const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
  ownerID: { type: String, required: true },
  text: { type: String, required: true },
  folder: { type: Schema.Types.Mixed, required: false },
  completed: { type: Boolean, required: false },
  creationStamp: { type: String, required: false },
})

module.exports = mongoose.model('items', itemSchema)
