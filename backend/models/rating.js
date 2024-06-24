const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Services',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'Ratings',
    timestamps: true,
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Rating.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  };

  return Rating;
};
