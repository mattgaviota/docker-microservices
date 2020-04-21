'use strict'

const express = require('express')
const { signin, signup } = require('../services/authService')
const router = express.Router()

router.get('/signin', signin)
router.get('/signup', signup)

module.exports = router
