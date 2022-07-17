const express = require('express')
const UserController = require('../controller/user.controller')
const AuthMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/account/edit/name', UserController.editName)
router.post('/account/edit/password', UserController.editPass)
router.post('/chats/add/user', UserController.addChat)
router.post('/chats/check/user', UserController.checkChat)
router.get('/chats/get/user', UserController.getChats)
router.get('/check', UserController.check)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/get/users', UserController.getUsers)

module.exports = router