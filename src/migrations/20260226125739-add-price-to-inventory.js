'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // Add column as nullable first
    await queryInterface.addColumn('inventory', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });

    // Set existing records to 100.00
    await queryInterface.sequelize.query(`
      UPDATE inventory
      SET price = 100.00
      WHERE price IS NULL;
    `);

    await queryInterface.sequelize.query(`
      UPDATE inventory
      SET productionDate = NOW()
      WHERE productionDate IS NULL;
    `);

    // Make column NOT NULL
    await queryInterface.changeColumn('inventory', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });

      // Make production_date NOT NULL
    await queryInterface.changeColumn('inventory', 'productionDate', {
      type: Sequelize.DATE,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('inventory', 'price');
    await queryInterface.changeColumn('inventory', 'productionDate', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};