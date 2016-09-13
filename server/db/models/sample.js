'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sample = sequelize.define('Sample', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { Sample, Beat, SoundSet } = models;
        Sample.hasMany(Beat, { foreignKey: 'sample_id' })
        Sample.belongsTo(SoundSet, { foreignKey: 'sound_set_id' });
      },
      tableName: 'samples'
    }
  });
  return Sample;
};
