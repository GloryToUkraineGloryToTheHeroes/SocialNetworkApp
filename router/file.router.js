const express = require('express')
const router = new express.Router()
const FileController = require('../controller/file.controller')

//  /files
router.post('/avatar', FileController.uploadAvatar)
router.post('/avatar/delete', FileController.deleteAvatar)
router.post('/posts/upload', FileController.uploadPost)
router.get('/avatar/get', FileController.getAvatar)
router.get('/posts/get', FileController.getPost)




module.exports = router