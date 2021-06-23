// const mysql = require("mysql");
const MySqlConnentionKeys = require("../config/keys.json").database;
// const mySqlConnection = mysql.createPool(MySqlConnentionKeys);
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(MySqlConnentionKeys.database, MySqlConnentionKeys.user, MySqlConnentionKeys.password, {
    host: MySqlConnentionKeys.host,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });


module.exports = sequelize;