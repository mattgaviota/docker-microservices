'use strict'

const { hashPassword } = require('../utils')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
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
    // associations can be defined here
  }
  return User
}
