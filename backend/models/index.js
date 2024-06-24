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

const User = require('./user')(sequelize, Sequelize);
const Pet = require('./pet')(sequelize, Sequelize);
const Service = require('./service')(sequelize, Sequelize);
const Comment = require('./comment')(sequelize, Sequelize);
const Message = require('./message')(sequelize, Sequelize);
const ServiceRequest = require('./serviceRequest')(sequelize, Sequelize);
const ServicePet = require('./servicePets')(sequelize, Sequelize);

const models = {
  User,
  Pet,
  Service,
  Comment,
  Message,
  ServiceRequest,
  ServicePet,
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

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
db.Message = Message;
db.ServiceRequest = ServiceRequest;
db.ServicePet = ServicePet;

module.exports = db;
