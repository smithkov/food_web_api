"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CardDetails", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      cardNo: {
        type: Sequelize.STRING,
      },
      expiryDate: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      holderName: {
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
      cardTypeId: {
        type: Sequelize.UUID,
        references: {
          model: 'CardTypes',
          key: 'id',
          as: 'cardTypeId',
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
    return queryInterface.dropTable("CardDetails");
  },
};
