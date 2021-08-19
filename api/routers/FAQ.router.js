const express = require('express')
const router = express.Router()

const controller = require('../controllers/FAQ.controller')

router.get('/', controller.getList)
router.post('/creat', controller.creatList)


module.exports = router