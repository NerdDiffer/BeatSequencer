'use strict';
module.exports = function(sequelize, DataTypes) {
  var SoundSet = sequelize.define('SoundSet', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { Sample, SoundSet } = models;
        SoundSet.hasMany(Sample)
      },
      tableName: 'sound_sets'
    }
  });
  return SoundSet;
};
