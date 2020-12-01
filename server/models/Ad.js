const mongoose = require('mongoose')

const Scheml = mongoose.Schema({
  name: String,
  items: [{
    image: String,
    url: String
  }]
})

module.exports = mongoose.model('Ad', Scheml)