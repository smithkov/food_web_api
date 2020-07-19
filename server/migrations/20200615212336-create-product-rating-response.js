"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ProductRatingResponses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      content: {
        type: Sequelize.STRING,
      },
      ratingId: {
        type: Sequelize.UUID,
        references: {
          model: "ProductRatings",
          key: "id",
          as: "ratingId",
        },
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
          as: "userId",
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ProductRatingResponses");
  },
};
