const { User } = require('../models')

const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAndCountAll()

    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  listUsers
}
