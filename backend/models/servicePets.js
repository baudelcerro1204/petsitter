// models/ServicePet.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ServicePet = sequelize.define('ServicePet', {
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Service',
        key: 'id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    petType: {
      type: DataTypes.ENUM,
      values: ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile'],
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'ServicePets',
    timestamps: false,
  });

  return ServicePet;
};
