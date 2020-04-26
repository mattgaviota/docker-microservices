'use strict'

const express = require('express')
const { signin, signup } = require('../services/authService')
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router
