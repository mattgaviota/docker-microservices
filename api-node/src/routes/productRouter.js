'use strict'

const express = require('express')
const { listProducts, addProduct, updateProduct, deleteProduct } = require('../services/productService')
const router = express.Router()

router.get('/', listProducts)
router.post('/', addProduct)
router.post('/:id', updateProduct)
router.get('/:id/delete', deleteProduct)

module.exports = router
