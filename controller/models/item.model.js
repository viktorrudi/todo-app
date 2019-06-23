const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
  text: { type: String, required: true },
  folder: { type: Number, required: false },
  completed: { type: Boolean, required: true },
  creationStamp: { type: String, required: false },
})

module.exports = mongoose.model('TodoItems', itemSchema)
