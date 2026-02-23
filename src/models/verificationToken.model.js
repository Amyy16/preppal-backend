const { sequelize } = require('../connection.js');
const { DataTypes } = require('sequelize');

const VerificationToken = sequelize.define("VerificationToken", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  tokenHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }

}, {
  timestamps: true,
  tableName: 'verification_tokens'
});

module.exports = VerificationToken;