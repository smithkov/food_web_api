'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ShopVideos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      videoUrl: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      shopId: {
        type: Sequelize.UUID,
        references: {
          model: 'VirtualShops',
          key: 'id',
          as: 'shopId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ShopVideos');
  }
};