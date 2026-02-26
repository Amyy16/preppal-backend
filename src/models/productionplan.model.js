const { sequelize } = require("../connection.js");
const { DataTypes } = require("sequelize");

const ProductionPlan = sequelize.define(
  "ProductionPlan",
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

    planDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    predictedDemand: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    plannedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    riskLevel: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    wastePercentage: {
      type: DataTypes.DECIMAL(5, 2),
    },
  },
  {
    tableName: "production_plans",
  },
);

ProductionPlan.associate = function (models) {
  ProductionPlan.belongsTo(models.Business, {
    foreignKey: "businessId",
  });

  ProductionPlan.belongsTo(models.MenuItem, {
    foreignKey: "itemId",
  });
};

module.exports = ProductionPlan;
