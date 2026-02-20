'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    location: {
      type: DataTypes.STRING
    },

    operatingHours: {
      type: DataTypes.STRING
    },

    peakPeriod: {
      type: DataTypes.STRING
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });

  Business.associate = function(models) {
    Business.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return Business;
};
