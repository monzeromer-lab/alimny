const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
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