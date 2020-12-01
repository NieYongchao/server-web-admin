const mongoose = require('mongoose')

const Scheml = mongoose.Schema({
  title: String,
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: String
})

module.exports = mongoose.model('Article', Scheml)