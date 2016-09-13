'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { User, Beat, Sequence } = models;
        User.hasMany(Beat, { foreignKey: 'user_id' });
        User.hasMany(Sequence, { foreignKey: 'user_id' });
      },
      tableName: 'users'
    }
  });
  return User;
};
