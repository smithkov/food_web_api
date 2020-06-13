"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      value: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING
    },
    {}
  );
  Rating.associate = function (models) {
    // associations can be defined here
    Rating.belongsTo(models.Product, {
      foreignKey: "productId",
    });
    Rating.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Rating.belongsTo(models.VirtualShop, {
      foreignKey: "shopId",
    });
    Rating.hasMany(models.RatingResponse, {
      foreignKey: "ratingId",
      as: "ratingResponses",
    });
  };
  return Rating;
};
