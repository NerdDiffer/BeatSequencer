'use strict';
module.exports = function(sequelize, DataTypes) {
  var BeatSequence = sequelize.define('BeatSequence', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      tableName: 'beat_sequences'
    }
  });
  return BeatSequence;
};
