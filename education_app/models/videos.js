'use strict';
module.exports = function(sequelize, DataTypes) {
  var videos = sequelize.define('videos', {
    title: DataTypes.STRING,
    instructor: DataTypes.STRING,
    paid: DataTypes.BOOLEAN,
    link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return videos;
};