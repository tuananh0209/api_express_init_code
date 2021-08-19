const express = require('express')

var Router = express.Router()
const controller = require('../controllers/user.controller')

Router.post('/register', controller.register)
Router.post('/login', controller.login)

module.exports = Router