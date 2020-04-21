'use strict'

const { User } = require('../models')
const { comparePassword, generateToken } = require('../utils')

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('User not found')
    }

    const hashed = user.password
    const isValid = await comparePassword(password, hashed)
    if (!isValid) {
      throw new Error('Invalid password!')
    }

    const token = generateToken(user)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    }
  } catch (err) {
    return next(err)
  }
}

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({
      name,
      email,
      password
    })

    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  signin,
  signup
}
