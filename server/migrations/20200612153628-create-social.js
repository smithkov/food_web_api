'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Socials', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      socialTypeId: {
        type: Sequelize.UUID,
        references: {
          model: 'SocialTypes',
          key: 'id',
          as: 'socialTypeId',
        },
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