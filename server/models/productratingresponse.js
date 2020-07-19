'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductRatingResponse = sequelize.define('ProductRatingResponse', {
    content: DataTypes.STRING
  }, {});
  ProductRatingResponse.associate = function(models) {
    ProductRatingResponse.belongsTo(models.ProductRating, {
      foreignKey: 'ratingId'
    });
    ProductRatingResponse.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    ProductRatingResponse.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return ProductRatingResponse;
};