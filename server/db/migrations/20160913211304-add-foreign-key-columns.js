'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn('sequences', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // should be table name
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      allowNull: false
    });
    queryInterface.addColumn('beat_sequences', 'beat_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'beats', // should be table name
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      allowNull: false
    });
    queryInterface.addColumn('beat_sequences', 'sequence_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'sequences', // should be table name
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      allowNull: false
    });
    queryInterface.addColumn('beats', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // should be table name
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      allowNull: false
    });
    queryInterface.addColumn('beats', 'sample_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'samples', // should be table name
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      allowNull: false
    });
    queryInterface.addColumn('samples', 'sound_set_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'sound_sets', // should be table name
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      allowNull: false
    });

    return queryInterface;
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn('samples', 'sound_set_id');
    queryInterface.removeColumn('beats', 'sample_id');
    queryInterface.removeColumn('beats', 'user_id');
    queryInterface.removeColumn('beat_sequences', 'beat_id');
    queryInterface.removeColumn('beat_sequences', 'sequence_id');
    queryInterface.removeColumn('sequences', 'user_id');

    return queryInterface;
  }
};
