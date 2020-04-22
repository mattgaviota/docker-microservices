'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10

function generateToken (user) {
  const { JWT_SECRET } = process.env

  const payload = {
    iss: 'ancud-jwt',
    sub: user.id,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
  }
  const token = jwt.sign(payload, JWT_SECRET)
  return token
}

function hashPassword (password) {
  return bcrypt.hash(password, saltRounds)
}

function comparePassword (password, hash) {
  return bcrypt.compare(password, hash)
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken
}
