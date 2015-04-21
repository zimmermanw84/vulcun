'use strict';

module.exports = {
  up: function (migration, Sequelize, done) {
    migration.createTable(
        'users',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          username: Sequelize.STRING,
          password: Sequelize.INTEGER,
          profile: Sequelize.TEXT,
        }
    ).complete(done);
  },

  down: function (migration, Sequelize, done) {

    migration.dropTable('users').complete(done);
  }
};
