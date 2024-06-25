'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
    },
    password:{
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
  },{
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Token, {
      foreignKey: 'userId',
      as: 'tokens'
    });
  };

  return User;
};

