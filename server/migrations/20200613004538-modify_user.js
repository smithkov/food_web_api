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
      // queryInterface.addColumn('VirtualShops', 'verificationCode', {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn('Transactions', 'paymentId', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),

      // queryInterface.addColumn('VirtualShops', 'proofOfIdentity', {
      //   type: Sequelize.JSONB,
      //   allowNull: true,
      //   defaultValue:[]
      // }),
      
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
      // queryInterface.addColumn("VirtualShops", "originId", {
      //   type: Sequelize.UUID,
      //   references: {
      //     model: "Origins",
      //     key: "id",
      //     as: "originId",
      //   },
      // }),
      queryInterface.addColumn("Origins", "code", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
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
