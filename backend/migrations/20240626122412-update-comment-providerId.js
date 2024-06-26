'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comments', 'providerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Nombre de la tabla referenciada
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'providerId');
  }
};
