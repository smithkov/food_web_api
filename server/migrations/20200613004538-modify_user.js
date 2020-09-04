"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn(
      //   "Users", // table name
      //   "firstAddress", // new field name
      //   {
      //     allowNull: false,
      //     autoIncrement: false,
      //     primaryKey: true,
      //     type: Sequelize.UUID,
      //   }
      // ),
      // queryInterface.addColumn("Users", "firstAddress", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Users", "expiry", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Users", "secondAddress", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Users", "postCode", {
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
      // queryInterface.addColumn("Origins", "code", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Socials", "instagram", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      queryInterface.addColumn("VirtualShops", "isPreOrder", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      }),
      // queryInterface.addColumn("VirtualShops", "minTime", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("StoreTimes", "shopId", {
      //   type: Sequelize.UUID,
      //   references: {
      //     model: "VirtualShops",
      //     key: "id",
      //     as: "shopId",
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
