const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Cambiado a 'User' en lugar de 'Users'
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Service',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: true,
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { // Cambiado a belongsTo en lugar de hasMany
      foreignKey: 'userId',
      as: 'user',
    });
    Comment.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'service',
    });
  };

  return Comment;
};
