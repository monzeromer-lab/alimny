'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id : {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrements:true,
        allowNull:false,
      },
      username : {
          type : Sequelize.STRING,
          allowNull : false,
          unique: true
      },
      firstName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      lastName: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      image: {
          type: Sequelize.STRING,
          defaultValue: "/public/images/blank.png"
      },
      birthDate:{
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false
      },
      role: {
          type : Sequelize.STRING,
          allowNull:false,
          defaultValue : 0
      },
      verification_code: {
          type: Sequelize.TEXT,
          allowNull: true
      },
      verified: {
          type: Sequelize.TINYINT,
          defaultValue: 0
      },
      active: {
          type: Sequelize.TINYINT,
          defaultValue: 1
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};