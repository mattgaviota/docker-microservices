const fetch = require('node-fetch')

const isAuth = async (req, res, next) => {
  try {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
      ? req.headers.authorization.split(' ')[1] : ''

    if (!token) {
      throw new Error('authentication fail')
    }

    const url = 'http://api-php:8000/api/validate'
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const { data, errors } = await response.json()

    if (!response.ok || !data) {
      throw new Error(errors.join('|'))
    }
    req.user = data

    next()
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

module.exports = {
  isAuth
}
