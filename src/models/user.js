'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Owner'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lockUntil: {
      type: DataTypes.DATE
    }
  });

  User.associate = function(models) {
    User.hasOne(models.Business, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };

  return User;
};
