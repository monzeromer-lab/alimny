'use strict';
const bcrypt = require('bcryptjs');
const {
  Model,
  Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize=Sequelize, DataTypes = DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    
    email: DataTypes.STRING,
    password: {
      type:DataTypes.STRING,
   
    },
    image: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    role: DataTypes.STRING,
    verification_code: DataTypes.STRING,
    verified: DataTypes.TINYINT,
    active: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};