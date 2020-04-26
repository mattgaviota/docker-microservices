'use strict'
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    underscored: true
  })
  Category.associate = function (models) {
    Category.hasMany(models.Product, { as: 'products' })
  }
  return Category
}
