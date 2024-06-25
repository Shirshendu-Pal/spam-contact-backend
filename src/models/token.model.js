'use strict';

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('refresh', 'reset_password_link', 'mail_verify', 'reset_password_otp'),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Token.associate = (models) => {
    Token.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Token;
};
