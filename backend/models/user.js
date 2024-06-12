const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['usuario', 'proveedor'],
      allowNull: false,
      defaultValue: 'usuario',
    },
  }, {
    tableName: 'Users',
    timestamps: true,
  });

  User.associate = function(models) {
    User.hasMany(models.Pet, { foreignKey: 'userId', as: 'pets' });
    User.hasMany(models.Service, { foreignKey: 'providerId', as: 'services' });
    User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
    User.hasMany(models.Message, { as: 'SentMessages', foreignKey: 'senderId' });
    User.hasMany(models.Message, { as: 'ReceivedMessages', foreignKey: 'receiverId' });
    User.hasMany(models.ServiceRequest, { foreignKey: 'userId', as: 'serviceRequests' });
  };

  return User;
};
