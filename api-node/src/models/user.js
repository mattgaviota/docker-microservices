'use strict'

const { hashPassword } = require('../utils')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    usertype: DataTypes.ENUM(['seller', 'buyer'])
  }, {
    underscored: true,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = await hashPassword(user.password)
      }
    }
  })
  User.associate = function (models) {
    User.hasMany(models.Product, { as: 'products' })
  }
  return User
}
