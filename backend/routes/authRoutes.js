const express = require('express')
const { registerUser, loginUser, validateToken } = require('../controllers/authController')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/validate').post(validateToken)

module.exports = router