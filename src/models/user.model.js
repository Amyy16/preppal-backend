const { sequelize } = require('../connection.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("OWNER", "MANAGER", "STAFF"),
    defaultValue: "OWNER",
  },

  accountStatus: {
    type: DataTypes.ENUM("ACTIVE", "PENDING", "SUSPENDED", "DELETED"),
    defaultValue: "PENDING",
  },

  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  emailVerifiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }

}, {
  timestamps: true,
  tableName: 'users'
});

module.exports = User;