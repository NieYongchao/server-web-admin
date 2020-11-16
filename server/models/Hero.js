const mongoose = require('mongoose')

const Scheml = mongoose.Schema({
  name: String,
  icon: String,
  title: String,
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficulty: Number,
    skill: Number,
    attack: Number,
    survive: Number
  },
  skills: [{
    icon: String,
    name: String,
    description: String,
    tip: String
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTip: String,
  battleTip: String,
  teamTip: String,
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: String
  }]
})

module.exports = mongoose.model('Hero', Scheml)