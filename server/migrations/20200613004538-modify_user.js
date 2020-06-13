"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "VirtualShops", // table name
        "firstAddress", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn("VirtualShops", "secondAddress", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("VirtualShops", "postCode", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("VirtualShops", "cityId", {
        type: Sequelize.UUID,
        references: {
          model: "Cities",
          key: "id",
          as: "cityId",
        },
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
