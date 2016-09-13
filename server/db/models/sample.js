'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sample = sequelize.define('Sample', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      tableName: 'samples'
    }
  });
  return Sample;
};
