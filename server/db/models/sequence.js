'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sequence = sequelize.define('Sequence', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        const { User, Sequence, BeatSequence } = models;
        Sequence.belongsTo(User);
        Sequence.hasMany(BeatSequence);
      },
      tableName: 'sequences'
    }
  });
  return Sequence;
};
