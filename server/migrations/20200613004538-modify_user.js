"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
   
      queryInterface.addColumn("Ratings", "shopId", {
        type: Sequelize.UUID,
        references: {
          model: "VirtualShops",
          key: "id",
          as: "shopId"
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
