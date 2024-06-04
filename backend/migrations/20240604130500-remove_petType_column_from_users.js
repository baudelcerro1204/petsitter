'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'petType');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'petType', {
      type: Sequelize.STRING, // Ajusta esto según los requisitos originales
      allowNull: true, // Ajusta esto según los requisitos originales
    });
  }
};
