module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nombre correcto de la tabla
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nombre correcto de la tabla
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Services', // Nombre correcto de la tabla
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'Messages', // Nombre correcto de la tabla
  });

  Message.associate = function(models) {
    Message.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
    Message.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
    Message.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  };

  return Message;
};
