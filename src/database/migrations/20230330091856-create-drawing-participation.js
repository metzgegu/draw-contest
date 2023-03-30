'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DrawingParticipations', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      contestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      status: {
        type: Sequelize.STRING,
      },
      s3link: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DrawingParticipations')
  },
}