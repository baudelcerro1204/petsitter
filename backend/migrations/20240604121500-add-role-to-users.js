'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM,
      values: ['usuario', 'proveedor'],
      allowNull: false,
      defaultValue: 'usuario',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.sequelize.query('DROP TYPE "enum_Users_role";'); // Eliminar el tipo ENUM manualmente
  }
};
