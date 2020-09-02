'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Socials', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID

      },
      twitter: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      instagram: {
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
    return queryInterface.dropTable('Socials');
  }
};