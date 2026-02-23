const { sequelize } = require('../connection.js');
const { DataTypes } = require('sequelize');

const DailySales = sequelize.define("DailySales", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  businessId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  inventoryId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  quantitySold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  stockLeft: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

}, {
  timestamps: true,
  tableName: 'daily_sales'
});

module.exports = DailySales;