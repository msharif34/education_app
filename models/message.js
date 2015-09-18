'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define('message', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return message;
};