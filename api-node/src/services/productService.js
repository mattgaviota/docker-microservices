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
      data: products,
      message: 'success'
    })
  } catch (err) {
    return next(err)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const { user, body } = req
    const product = await Product.create({
      userId: user.id,
      ...body
    })

    return res.status(200).send({
      data: product,
      message: 'A new product was created.'
    })
  } catch (err) {
    return next(err)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { body, params: { id } } = req
    const result = await Product.update({
      ...body
    }, {
      returning: true,
      where: {
        id
      }
    })

    return res.status(200).send({
      data: result[1][0].get(),
      message: 'Product was updated.'
    })
  } catch (err) {
    return next(err)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { params: { id } } = req
    await Product.destroy({
      where: {
        id
      }
    })

    return res.status(200).send({
      message: 'Product was deleted.'
    })
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
