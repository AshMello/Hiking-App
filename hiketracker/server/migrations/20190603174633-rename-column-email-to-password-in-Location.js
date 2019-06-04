'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'email', 'password');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'password', 'email');
  }
};
