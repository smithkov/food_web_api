"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      userName: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      expiry: {
        type: Sequelize.DATE,
      },
      ip: {
        type: Sequelize.STRING,
      },
      source: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
      photo: {
        type: Sequelize.STRING,
      },
      firstAddress: {
        type: Sequelize.STRING,
      },
      secondAddress: {
        type: Sequelize.STRING,
      },
      postCode: {
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
      roleId: {
        type: Sequelize.UUID,
        references: {
          model: "Roles",
          key: "id",
          as: "roleId",
        },
      },
      statusId: {
        type: Sequelize.UUID,
        references: {
          model: "Statuses",
          key: "id",
          as: "statusId",
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
