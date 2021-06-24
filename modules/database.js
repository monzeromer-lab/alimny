const config = require("../config/keys.json").database;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.type,
    logging: false,
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

module.exports = sequelize;