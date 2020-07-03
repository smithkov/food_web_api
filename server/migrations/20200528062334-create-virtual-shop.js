"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("VirtualShops", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      shopName: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      totalSale: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.STRING,
      },
      shopUrl: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("VirtualShops");
  },
};
