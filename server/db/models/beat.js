'use strict';
module.exports = function(sequelize, DataTypes) {
  var Beat = sequelize.define('Beat', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      tableName: 'beats'
    }
  });
  return Beat;
};
