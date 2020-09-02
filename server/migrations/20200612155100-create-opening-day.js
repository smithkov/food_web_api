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
        type: Sequelize.DATE,
      },
      oTime: {
        type: Sequelize.TIME,
      },
      cTime: {
        type: Sequelize.TIME,
      },
      closing: {
        type: Sequelize.DATE,
      },
      day: {
        type: Sequelize.STRING,
      },
      dayNum: {
        type: Sequelize.INTEGER,
      },
      checked: {
        type: Sequelize.BOOLEAN,
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
