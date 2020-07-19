"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductRating = sequelize.define(
    "ProductRating",
    {
      rating: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  ProductRating.associate = function (models) {
    ProductRating.belongsTo(models.User, {
      foreignKey: "userId",
    });
    ProductRating.belongsTo(models.VirtualShop, {
      foreignKey: "shopId",
    });
    ProductRating.belongsTo(models.Product, {
      foreignKey: "productId",
    });
    ProductRating.hasMany(models.ProductRatingResponse, {
      foreignKey: "ratingId",
      as: "ratingResponses",
    });
  };
  return ProductRating;
};
