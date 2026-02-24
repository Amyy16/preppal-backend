const { sequelize } = require('../connection.js');
const { DataTypes } = require('sequelize');

const Inventory = sequelize.define("Inventory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  businessId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  productType: {
    type: DataTypes.STRING,
  },

  quantityAvailable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

productionDate: {
  type: DataTypes.DATE,
},

shelf: {
    type: DataTypes.STRING,
  allowNull: true
  },

}, {
  timestamps: true,
  tableName: 'inventory'
});

module.exports = Inventory;