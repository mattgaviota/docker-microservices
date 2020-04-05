'use strict'

const express = require('express')

const app = express()
app.use(express.json())
app.use('/api', (req, res) => {
  res.status(200).send({ message: 'Hello world' })
})

module.exports = app
