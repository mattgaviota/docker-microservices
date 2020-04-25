'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.FLOAT,
    price: DataTypes.FLOAT
  }, {
    paranoid: true,
    underscored: true
  })
  Product.associate = function (models) {
    Product.belongsTo(models.User, { as: 'user' })
    Product.belongsTo(models.Category, { as: 'category' })
  }
  return Product
}
