'use strict';
module.exports = function(sequelize, DataTypes) {
  var course = sequelize.define('course', {
    title: DataTypes.STRING,
    instructor: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    paid: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.course.hasMany(models.asset);
      }
    }
  });
  return course;
};