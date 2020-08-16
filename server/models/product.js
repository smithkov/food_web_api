'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    price: DataTypes.STRING,
    discountPrice: DataTypes.STRING,
    quantity: DataTypes.STRING,
    desc: DataTypes.STRING,
    canBuyerEditIngredient: DataTypes.BOOLEAN,
    ingredients: DataTypes.JSONB,
    weight: DataTypes.STRING
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
    Product.belongsTo(models.Origin, {
      foreignKey: 'originId'
    });
    Product.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  
    Product.hasMany(models.ProductRating, {
      foreignKey: 'productId',
      as: 'productRatings',
    });
    Product.hasMany(models.Sponsor, {
      foreignKey: 'productId',
      as: 'sponsors',
    });
  
    Product.hasMany(models.SoldProduct, {
      foreignKey: "productId",
      as: "soldProducts",
    });
    // Product.hasMany(models.Rating, {
    //   foreignKey: 'productId',
    //   as: 'ratings',
    // });
  };
  return Product;
};