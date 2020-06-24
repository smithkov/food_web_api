"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn(
      //   "Users", // table name
      //   "firstAddress", // new field name
      //   {
      //     type: Sequelize.STRING,
      //     allowNull: true,
      //   }
      // ),
      // queryInterface.addColumn("Users", "secondAddress", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      queryInterface.addColumn("Socials", "facebook", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Socials", "twitter", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Socials", "instagram", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      // queryInterface.addColumn("VirtualShops", "maxTime", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("VirtualShops", "minTime", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      //  queryInterface.addColumn("ProductRatings", "productId", {
      //   type: Sequelize.UUID,
      //   references: {
      //     model: "Products",
      //     key: "id",
      //     as: "productId",
      //   },
      // }),
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
