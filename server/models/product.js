'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    discountPrice: DataTypes.STRING,
    quantity: DataTypes.STRING,
    desc: DataTypes.STRING,
    weight: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Unit, {
      foreignKey: 'unitId'
    });
    Product.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Product.belongsTo(models.SubCategory, {
      foreignKey: 'subCategoryId'
    });
    Product.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
    Product.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      as: 'productImages',
    });
    Product.hasMany(models.Sponsor, {
      foreignKey: 'productId',
      as: 'sponsors',
    });
    Product.hasMany(models.Transaction, {
      foreignKey: 'productId',
      as: 'transactions',
    });
  };
  return Product;
};