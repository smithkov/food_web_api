'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BusinessAddresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      firstAddress: {
        type: Sequelize.STRING
      },
      secondAddress: {
        type: Sequelize.STRING
      },
      postCode: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.UUID,
        references: {
          model: "Cities",
          key: "id",
          as: "cityId",
        },
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BusinessAddresses');
  }
};