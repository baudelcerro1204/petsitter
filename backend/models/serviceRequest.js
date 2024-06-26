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
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    receiverId: {
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'ServiceRequests',
    timestamps: true,
  });

  ServiceRequest.associate = function(models) {
    ServiceRequest.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
    ServiceRequest.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
    ServiceRequest.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  };

  return ServiceRequest;
};
