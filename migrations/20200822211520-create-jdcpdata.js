'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jdcpdata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.INTEGER
      },
      clause: {
        type: Sequelize.TEXT
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jdcpdata');
  }
};