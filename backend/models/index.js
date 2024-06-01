const { Sequelize } = require('sequelize');
const userModel = require('./user');

const sequelize = new Sequelize('postgres://postgres.ntlifxsgujauyqtwtpzm:Influex321!@aws-0-us-east-1.pooler.supabase.com:6543/postgres');

const User = userModel(sequelize);

sequelize.sync({ alter: true })  // Usar alter: true para sincronizar las modificaciones
  .then(() => {
    console.log('Base de datos y tablas sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

module.exports = {
  User,
  sequelize,
};
