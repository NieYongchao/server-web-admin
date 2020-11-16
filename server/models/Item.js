const mongoose = require('mongoose')

const Scheml = mongoose.Schema({
  name: String,
  icon: String
})

module.exports = mongoose.model('Item', Scheml)