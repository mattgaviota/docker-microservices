const { Op } = require('sequelize')
const { Product, Category, User } = require('../models')

const listProducts = async (req, res, next) => {
  try {
    const { user } = req
    const { name, category, page, pageSize } = req.query
    const limit = pageSize ? parseInt(pageSize) : 10
    const offset = page ? parseInt((page - 1) * limit) : 0

    const whereStatement = {
      name: {
        [Op.iLike]: `%${name || ''}%`
      },
    }

    if (user.usertype === 'seller') {
      whereStatement.userId = user.id
    }

    if (category) {
      whereStatement.categoryId = category
    }

    const { rows, count } = await Product.findAndCountAll({
      attributes: ['id', 'name', 'description', 'amount', 'price'],
      limit,
      offset,
      include: [
        {
        model: Category,
        as: 'category',
        attributes: ['name', 'description']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email']
        }
      ],
      where: whereStatement
    })

    return res.status(200).send({
      data: rows,
      metadata: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        count
      },
      errors: []
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
      message: 'A new product was created.',
      errors: []
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
