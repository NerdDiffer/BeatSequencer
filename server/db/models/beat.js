'use strict';
module.exports = function(sequelize, DataTypes) {
  var Beat = sequelize.define('Beat', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { User, Beat, Sample, BeatSequence } = models;
        Beat.belongsTo(User);
        Beat.belongsTo(Sample);
        Beat.hasMany(BeatSequence);
      },
      tableName: 'beats'
    }
  });
  return Beat;
};
