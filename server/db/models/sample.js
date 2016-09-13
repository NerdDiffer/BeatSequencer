'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sample = sequelize.define('Sample', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { Sample, Beat, SoundSet } = models;
        Sample.hasMany(Beat)
        Sample.belongsTo(SoundSet);
      },
      tableName: 'samples'
    }
  });
  return Sample;
};
