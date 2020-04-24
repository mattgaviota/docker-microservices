const { Product } = require('../models')

const listProducts = async (req, res, next) => {
  try {
    const { user } = req
    const products = await Product.findAll({
      where: {
        userId: user.id
      }
    })

    return res.status(200).send({
      data: products
    })
  } catch (err) {
    return next(err)
  }
}

const addProduct = async (req, res, next) => {
  try {

  } catch (err) {
    return next(err)
  }
}

const updateProduct = async (req, res, next) => {
  try {

  } catch (err) {
    return next(err)
  }
}

const deleteProduct = async (req, res, next) => {
  try {

  } catch (err) {
    return next(err)
  }
}

module.exports = {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct
}
