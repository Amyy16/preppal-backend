'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daily_forecasts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      businessId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'businesses',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'inventory',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      forecastDate: {
        type: Sequelize.DATE,
        allowNull: false
      },

      predictedDemand: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      recommendedQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      confidence: {
        type: Sequelize.STRING(10),
        allowNull: false
      },

      confidenceScore: {
        type: Sequelize.DECIMAL(3,2),
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('daily_forecasts', ['forecastDate']);
    await queryInterface.addIndex('daily_forecasts', ['businessId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('daily_forecasts');
  }
};