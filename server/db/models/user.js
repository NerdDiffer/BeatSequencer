'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { User, Beat, Sequence } = models;
        User.hasMany(Beat);
        User.hasMany(Sequence);
      },
      tableName: 'users'
    }
  });
  return User;
};
