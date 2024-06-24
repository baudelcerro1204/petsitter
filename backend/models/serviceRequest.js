const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ServiceRequest = sequelize.define('ServiceRequest', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pendiente', 'aceptada', 'rechazada'],
      defaultValue: 'pendiente',
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
    tableName: 'ServiceRequests',
    timestamps: true,
  });

  ServiceRequest.associate = function(models) {
    ServiceRequest.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    ServiceRequest.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  };

  return ServiceRequest;
};
