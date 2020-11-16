const mongoose = require('mongoose')

const Scheml = mongoose.Schema({
  name: String,
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', Scheml)