'use strict';
module.exports = function(sequelize, DataTypes) {
  var asset = sequelize.define('asset', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    type: DataTypes.STRING,
    courseId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.asset.belongsTo(models.course);
      }
    }
  });
  return asset;
};