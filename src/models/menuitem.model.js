'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    businessId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    category: {
      type: DataTypes.STRING
    },

    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }

  }, {
    tableName: 'menu_items'
  });

  MenuItem.associate = function(models) {
    MenuItem.belongsTo(models.Business, {
      foreignKey: 'businessId'
    });

    MenuItem.hasMany(models.DailyForecast, {
      foreignKey: 'itemId'
    });

    MenuItem.hasMany(models.ProductionPlan, {
      foreignKey: 'itemId'
    });
  };

  return MenuItem;
};