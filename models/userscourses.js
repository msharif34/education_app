'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersCourses = sequelize.define('usersCourses', {
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersCourses;
};