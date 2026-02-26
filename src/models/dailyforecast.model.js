const { sequelize } = require("../connection.js");
const { DataTypes } = require("sequelize");

const DailyForecast = sequelize.define(
  "DailyForecast",
  {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    forecastDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    predictedDemand: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    recommendedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    confidence: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    confidenceScore: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
    },
  },
  {
    tableName: "daily_forecasts",
  },
);

DailyForecast.associate = function (models) {
  DailyForecast.belongsTo(models.Business, {
    foreignKey: "businessId",
  });

  DailyForecast.belongsTo(models.Inventory, {
    foreignKey: "itemId",
  });
};

module.exports = DailyForecast;