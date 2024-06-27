'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Services', 'startDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Services', 'endDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Services', 'zone', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Services', 'frequency', {
      type: Sequelize.ENUM('única', 'diaria', 'semanal', 'mensual'),
      allowNull: true,
    });

    await queryInterface.removeColumn('Services', 'duration');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Services', 'startDate');
    await queryInterface.removeColumn('Services', 'endDate');
    await queryInterface.removeColumn('Services', 'zone');

    await queryInterface.changeColumn('Services', 'frequency', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Services', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
