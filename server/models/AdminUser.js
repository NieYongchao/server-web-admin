const mongoose = require('mongoose')

const Scheml = mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false, //默认不显示
    set(val) {  // bcrypt 密码加密
      return require('bcrypt').hashSync(val, 10)
    }
  },
})

module.exports = mongoose.model('AdminUser', Scheml)