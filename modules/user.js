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
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    profile_pic: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    birth_date:{
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
        allowNull:false
    },
    }, {
        freezeTableName: true
    }
);

module.exports = users;