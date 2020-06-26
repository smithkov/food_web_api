'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      tempId: {
        type: Sequelize.STRING
      },
      subTotal: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DECIMAL
      },
      orders: {
        type: Sequelize.JSONB
      },
      offerDiscount: {
        type: Sequelize.DECIMAL
      },
      deliveryPrice: {
        type: Sequelize.DECIMAL
      },
      message: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      shopId: {
        type: Sequelize.UUID,
        references: {
          model: "VirtualShops",
          key: "id",
          as: "shopId",
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};