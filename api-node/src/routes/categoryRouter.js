'use strict'

const express = require('express')
const { listCategories } = require('../services/categoryService')
const router = express.Router()

router.get('/', listCategories)

module.exports = router
