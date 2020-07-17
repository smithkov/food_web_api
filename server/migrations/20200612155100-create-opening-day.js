"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("OpeningDays", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      opening: {
        type: Sequelize.TIME,
      },
      closing: {
        type: Sequelize.TIME,
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
    return queryInterface.dropTable("OpeningDays");
  },
};
