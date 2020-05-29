'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      discountPrice: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      unitId: {
        type: Sequelize.UUID,
        references: {
          model: 'Units',
          key: 'id',
          as: 'unitId',
        },
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      subCategoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'SubCategories',
          key: 'id',
          as: 'subCategoryId',
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
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId',
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
    return queryInterface.dropTable('Products');
  }
};