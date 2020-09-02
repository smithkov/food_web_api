'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StoreTimes', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      Monday: {
        type: Sequelize.JSONB
      },
      Tuesday: {
        type: Sequelize.JSONB
      },
      Wednesday: {
        type: Sequelize.JSONB
      },
      Thursday: {
        type: Sequelize.JSONB
      },
      Friday: {
        type: Sequelize.JSONB
      },
      Saturday: {
        type: Sequelize.JSONB
      },
      Sunday: {
        type: Sequelize.JSONB
      },
      shopId: {
        type: Sequelize.UUID,
        references: {
          model: "VirtualShops",
          key: "id",
          as: "shopId",
        },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StoreTimes');
  }
};