'use strict'

const express = require('express')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')

const { isAuth } = require('../middlewares')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', isAuth, productRouter)
router.get('/', (req, res) => {
  res.send({ message: 'Hello world' })
})

module.exports = router
