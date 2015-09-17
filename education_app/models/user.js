'use strict';
var bcrypt   = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
        validate: {
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len:[8,99],
        notEmpty: true
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.provider);
        models.user.belongsToMany(models.course, {through: "usersCourses"});
      }
    },
    instanceMethods: {
      checkPassword: function(pass,callback){
        if(pass && this.password){
          bcrypt.compare(pass,this.password,callback);
        }else{
          callback(null,false);
        }
      }
    },
    hooks:{
      beforeCreate: function(user,options,sendback){
        if(user.password){
          bcrypt.hash(user.password,10,function(err,hash){
            if(err) throw err;
            user.password=hash;
            sendback(null,user);
          });
        }else{
          sendback(null,user);
        }
      }
    }
  });
  return user;
};