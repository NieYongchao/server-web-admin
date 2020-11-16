module.exports = (app) => {

  const express = require('express')
  const path = require('path')
  const router = express.Router({
    mergeParams: true
  })

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
    if(req.Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    }
    const data = await req.Model.find().setOptions(queryOption).limit(10)
    res.send(data)
  })

  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })

  app.use('/admin/api/rest/:source', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.source)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({dest: path.join(__dirname, '../../uploads')})
  app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}