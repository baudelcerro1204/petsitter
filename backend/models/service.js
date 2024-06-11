const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM,
      values: ['Cuidado', 'Adiestramiento', 'Paseo'],
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Habilitado',
    },
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Cambiado a 'Users' para coincidir con el nombre de la tabla
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'Services', // Asegura el uso del nombre correcto de la tabla
    timestamps: true,
  });

  Service.associate = function(models) {
    Service.hasMany(models.Message, { foreignKey: 'serviceId', as: 'messages' });
  };

  return Service;
};
