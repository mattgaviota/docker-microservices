'use strict'

const express = require('express')
const { listProducts } = require('../services/productService')
const router = express.Router()

router.get('/', listProducts)

module.exports = router
