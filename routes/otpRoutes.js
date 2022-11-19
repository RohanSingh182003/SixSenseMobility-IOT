const express = require('express')
const router = express.Router()

const otpController = require('../controllers/otpController')

router.post('/',otpController)

module.exports = router;