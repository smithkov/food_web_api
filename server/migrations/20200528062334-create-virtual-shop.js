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
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
      shopTypeId: {
        type: Sequelize.UUID,
        references: {
          model: "ShopTypes",
          key: "id",
          as: "shopTypeId",
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
