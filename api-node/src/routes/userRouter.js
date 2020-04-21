'use strict'

const express = require('express')
const { listUsers } = require('../services/userService')
const router = express.Router()

router.get('/', listUsers)

module.exports = router
