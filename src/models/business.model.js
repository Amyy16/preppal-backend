const { sequelize } = require('../connection.js');
const { DataTypes } = require('sequelize');

const Business = sequelize.define("Business", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  businessType: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  operatingHours: {
    type: DataTypes.STRING,
    allowNull: true,
  }

}, {
  timestamps: true,
  tableName: 'businesses'
});

module.exports = Business;