'use strict'

const express = require('express')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.get('/', (req, res) => {
  res.send({ message: 'Hello world' })
})

module.exports = router
