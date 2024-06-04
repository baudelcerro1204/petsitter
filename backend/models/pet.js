const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pet = sequelize.define('Pet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile'],
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
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
  }, {
    timestamps: true,
  });

  Pet.associate = function(models) {
    Pet.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Pet;
};
