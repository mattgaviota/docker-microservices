const { Category } = require('../models')

const listCategories = async (req, res, next) => {
  try {
    const rows = await Category.findAll()

    return res.status(200).send({
      data: rows,
      message: 'success'
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  listCategories
}
