const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/database");
const Course = require('./3-Course');

const Lesson = sequelize.define("lessons", {
	id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    image: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    video: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    description: {
    	type: DataTypes.TEXT,
    	allowNull: false,
    },
}

// Relationships
Lesson.hasOne(Course);
Course.hasMany(Lesson);

module.exports = Lesson;