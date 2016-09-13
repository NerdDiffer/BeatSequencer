'use strict';
module.exports = function(sequelize, DataTypes) {
  var BeatSequence = sequelize.define('BeatSequence', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { BeatSequence, Beat, Sequence } = models;
        BeatSequence.belongsTo(Sequence, { foreignKey: 'sequence_id' });
        BeatSequence.belongsTo(Beat, { foreignKey: 'beat_id' });
      },
      tableName: 'beat_sequences'
    }
  });
  return BeatSequence;
};
