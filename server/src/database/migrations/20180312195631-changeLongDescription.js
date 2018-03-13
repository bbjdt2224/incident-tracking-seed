'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('incidentrevisions', 'longDescription', Sequelize.TEXT);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('incidentrevisions', 'longDescription', Sequelize.STRING);
  }
};
