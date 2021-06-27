const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Category = sequelize.define("categories", {
	id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
    	type: DataTypes.STRING,
    	allowNull:false,
    	unique: true,
    }

});

module.exports = Category;