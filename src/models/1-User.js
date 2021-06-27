// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const User = sequelize.define("users", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set() {
        throw new Error("can not set a value to this filed");
      }
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "/public/images/blank.png"
    },
    birthDate:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type : DataTypes.ENUM('user','teacher','admin'),
        allowNull:false,
        defaultValue : 'admin'
    },
    verification_code: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    verified: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    active: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
    }, {
        freezeTableName: true
    }
);

module.exports = User;