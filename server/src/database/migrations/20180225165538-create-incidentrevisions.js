'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('incidentrevisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      incidentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      revisionNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shortDescription: {
        type: Sequelize.STRING
      },
      longDescription: {
        type: Sequelize.STRING
      },
      resolution: {
        type: Sequelize.STRING
      },
      severity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('incidentrevisions');
  }
};
