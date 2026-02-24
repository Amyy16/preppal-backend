'use strict';
module.exports = (sequelize, DataTypes) => {
  const DailyForecast = sequelize.define('DailyForecast', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    businessId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    itemId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    forecastDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    predictedDemand: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    recommendedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    confidence: {
      type: DataTypes.STRING(10),
      allowNull: false
    },

    confidenceScore: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false
    }

  }, {
    tableName: 'daily_forecasts'
  });

  DailyForecast.associate = function(models) {
    DailyForecast.belongsTo(models.Business, {
      foreignKey: 'businessId'
    });

    DailyForecast.belongsTo(models.MenuItem, {
      foreignKey: 'itemId'
    });
  };

  return DailyForecast;
};