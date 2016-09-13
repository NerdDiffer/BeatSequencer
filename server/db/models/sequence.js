'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sequence = sequelize.define('Sequence', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      tableName: 'sequences'
    }
  });
  return Sequence;
};
