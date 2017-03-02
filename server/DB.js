const Sequelize = require('sequelize');

const dbname = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PW


const sequelize = new Sequelize(dbname, username, password, {
  host: 'civicsportal.c9qldifjptpv.us-east-1.rds.amazonaws.com',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    tcp_keepalives_count: 5,
    tcp_keepalives_idle: 200,
    tcp_keepalives_interval: 200
  }
});
// bla bla
// ensures connection to db

setInterval(function(){ sequelize.sync() }, 1000);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize
