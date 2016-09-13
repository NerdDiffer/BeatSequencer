'use strict';
module.exports = function(sequelize, DataTypes) {
  var SoundSet = sequelize.define('SoundSet', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      tableName: 'sound_sets'
    }
  });
  return SoundSet;
};
