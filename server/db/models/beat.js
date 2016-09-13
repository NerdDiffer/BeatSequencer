'use strict';
module.exports = function(sequelize, DataTypes) {
  var Beat = sequelize.define('Beat', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { User, Beat, Sample, BeatSequence } = models;
        Beat.belongsTo(User, { foreignKey: 'user_id' });
        Beat.belongsTo(Sample, { foreignKey: 'sample_id' });
        Beat.hasMany(BeatSequence, { foreignKey: 'beat_id' });
      },
      tableName: 'beats'
    }
  });
  return Beat;
};
