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
      // queryInterface.addColumn("Users", "phone", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      queryInterface.addColumn('OpeningDays', 'checked', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      
      // queryInterface.addColumn("Transactions", "deliveryPrice", {
      //   type: Sequelize.DECIMAL,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Transactions", "subTotal", {
      //   type: Sequelize.DECIMAL,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Transactions", "offerDiscount", {
      //   type: Sequelize.DECIMAL,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Transactions", "shopId", {
      //   type: Sequelize.UUID,
      //   references: {
      //     model: "VirtualShops",
      //     key: "id",
      //     as: "shopId",
      //   },
      // }),
      // queryInterface.addColumn("Socials", "twitter", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Socials", "instagram", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
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
