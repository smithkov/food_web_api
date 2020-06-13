'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    imagePath: DataTypes.STRING,
    productId: DataTypes.UUID
  }, {});
  ProductImage.associate = function(models) {
    // associations can be defined here
    ProductImage.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
  };
  return ProductImage;
};