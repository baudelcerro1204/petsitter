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
    frequency: {
      type: DataTypes.ENUM,
      values: ['unica', 'diaria', 'semanal', 'mensual'],
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
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Services',
    timestamps: true,
  });

  Service.associate = function(models) {
    Service.hasMany(models.ServiceRequest, { foreignKey: 'serviceId', as: 'requests' });
    Service.belongsToMany(models.Pet, { through: models.ServicePet, foreignKey: 'serviceId', as: 'pets' });
    Service.belongsTo(models.User, { foreignKey: 'providerId', as: 'provider' });
    Service.hasMany(models.ServicePet, { foreignKey: 'serviceId', as: 'petTypes' }); // Nueva asociación
  };

  return Service;
};
