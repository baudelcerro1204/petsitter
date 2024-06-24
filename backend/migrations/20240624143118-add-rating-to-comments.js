module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comments', 'rating', {
      type: Sequelize.INTEGER,
      allowNull: true, // o true si prefieres que sea opcional
      validate: {
        min: 1,
        max: 5
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'rating');
  }
};
