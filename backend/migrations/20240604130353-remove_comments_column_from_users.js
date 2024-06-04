'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'comments');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'comments', {
      type: Sequelize.TEXT,
      allowNull: true, // Ajusta esto según los requisitos
    });
  }
};
