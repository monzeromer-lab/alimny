const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/database");
const User = require('./1-User');
const Category = require('./2-Category');

const Course = sequelize.define("courses", {
	id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    slug: {
        type: DataTypes.STRING
    },
    description: {
    	type: DataTypes.TEXT,
    	allowNull: false,
    },
    image: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    price: {
    	type: DataTypes.FLOAT,
    	allowNull: false,
    },
});

// Relationships
Course.belongsTo(User);
Course.belongsTo(Category);
User.hasMany(Course);
Category.hasMany(Course);

module.exports = Course;