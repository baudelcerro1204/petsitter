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
    description: { // Nuevo campo de descripción
      type: DataTypes.TEXT,
      allowNull: true, // Puedes cambiar a false si la descripción es obligatoria
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Habilitado',
    },
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: true,
  });

  return Service;
};
