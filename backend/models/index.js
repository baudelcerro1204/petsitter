const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const UserModel = require('./user');
const PetModel = require('./pet');
const ServiceModel = require('./service');
const CommentModel = require('./comment');
const MessageModel = require('./message'); // Importa el modelo Message

const User = UserModel(sequelize, Sequelize);
const Pet = PetModel(sequelize, Sequelize);
const Service = ServiceModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Message = MessageModel(sequelize, Sequelize); // Crea el modelo Message

User.associate = function(models) {
  User.hasMany(models.Pet, {
    foreignKey: 'userId',
    as: 'pets',
  });
  User.hasMany(models.Service, {
    foreignKey: 'providerId',
    as: 'services',
  });
  User.hasMany(models.Comment, {
    foreignKey: 'userId',
    as: 'comments',
  });
  User.hasMany(models.Message, { // Define la asociación para Message
    foreignKey: 'senderId',
    as: 'sentMessages',
  });
  User.hasMany(models.Message, {
    foreignKey: 'receiverId',
    as: 'receivedMessages',
  });
};

Pet.associate = function(models) {
  Pet.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
};

Service.associate = function(models) {
  Service.belongsTo(models.User, {
    foreignKey: 'providerId',
    as: 'provider',
  });
  Service.hasMany(models.Comment, {
    foreignKey: 'serviceId',
    as: 'comments',
  });
};

Comment.associate = function(models) {
  Comment.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
  Comment.belongsTo(models.Service, {
    foreignKey: 'serviceId',
    as: 'service',
  });
};

Message.associate = function(models) { // Define las asociaciones para Message
  Message.belongsTo(models.User, {
    foreignKey: 'senderId',
    as: 'sender',
  });
  Message.belongsTo(models.User, {
    foreignKey: 'receiverId',
    as: 'receiver',
  });
};

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos y tablas creadas');
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Pet = Pet;
db.Service = Service;
db.Comment = Comment;
db.Message = Message; // Agrega Message al objeto db

module.exports = db;
