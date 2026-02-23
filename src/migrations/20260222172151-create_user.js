'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM("OWNER", "MANAGER", "STAFF"),
        defaultValue: "OWNER",
      },

      accountStatus: {
        type: Sequelize.ENUM("ACTIVE", "PENDING", "SUSPENDED", "DELETED"),
        defaultValue: "PENDING",
      },

      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      emailVerifiedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
