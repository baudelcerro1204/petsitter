'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Cambiando 'frequency' a ENUM
      await queryInterface.changeColumn('Services', 'frequency', {
        type: Sequelize.ENUM('unica', 'diaria', 'semanal', 'mensual'),
        allowNull: false
      }, { transaction });

      // Cambiando 'zone' a ENUM
      await queryInterface.changeColumn('Services', 'zone', {
        type: Sequelize.ENUM('Palermo', 'Recoleta', 'Belgrano'),
        allowNull: false
      }, { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Revertir cambios si es necesario
      await queryInterface.changeColumn('Services', 'frequency', {
        type: Sequelize.STRING,
        allowNull: false
      }, { transaction });

      await queryInterface.changeColumn('Services', 'zone', {
        type: Sequelize.STRING,
        allowNull: false
      }, { transaction });

      // Si es necesario, borrar los ENUM creados
      await queryInterface.sequelize.query('DROP TYPE "enum_Services_frequency";', { transaction });
      await queryInterface.sequelize.query('DROP TYPE "enum_Services_zone";', { transaction });
    });
  }
};
