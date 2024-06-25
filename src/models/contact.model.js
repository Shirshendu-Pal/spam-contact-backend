'use strict';

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {

    addedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      name:{
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.INTEGER
      },
      isSpam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      spamCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }

  });

  Contact.associate = (models) => {
    Contact.belongsTo(models.User, {
      foreignKey: 'addedBy',
      as: 'user',
    });
  };

  return Contact;
};