// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./database");

const users = sequelize.define("users", {
    id : {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, username : {
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
        allowNull: false
    },
    role: {
        type : DataTypes.STRING,
        allowNull:false,
        defaultValue : 0
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
users.sync();
module.exports = users;