module.exports = (app) => {

  const express = require('express')
  const path = require('path')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser') 
  const router = express.Router({
    mergeParams: true
  })

  const authMiddleWare = require('../../middleWare/auth')


  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  router.get('/', async (req, res) => {
    const queryOption = {}
    if (req.Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    }
    const data = await req.Model.find().setOptions(queryOption).limit(10)
    res.send(data)
  })

  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })

  app.use('/admin/api/rest/:source', authMiddleWare(), async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.source)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({
    dest: path.join(__dirname, '../../uploads')
  })
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //登陆
  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body
    
    const user = await AdminUser.findOne({
      username
    }).select('+password')
    // 验证账户
    assert(user, 422, '用户不存在')
    // 验证密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 返回token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({
      token
    })
  })


  // 错误处理
  app.use(async(err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}