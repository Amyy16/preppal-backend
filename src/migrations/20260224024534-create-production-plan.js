'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('production_plans', {
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

      planDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      predictedDemand: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      plannedQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      riskLevel: {
        type: Sequelize.STRING(10),
        allowNull: false
      },

      wastePercentage: {
        type: Sequelize.DECIMAL(5,2)
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('production_plans');
  }
};