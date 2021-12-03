const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('acuario', 'root', 'password', {
  dialect: 'mysql',
  timezone: '-06:00',
});

/* const sequelize = new Sequelize(process.env.DB_HOST, {
  dialect: 'mysql',
  timezone: '-06:00',
}); */

module.exports = sequelize;
