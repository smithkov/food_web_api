"use strict";
module.exports = (sequelize, DataTypes) => {
  const VirtualShop = sequelize.define(
    "VirtualShop",
    {
      shopName: DataTypes.STRING,
      logo: DataTypes.STRING,
      totalSale: DataTypes.STRING,
      bio: DataTypes.STRING,
      firstAddress: DataTypes.STRING,
      secondAddress: DataTypes.STRING,
      postCode: DataTypes.STRING,
      shopUrl: DataTypes.STRING,
      notice: DataTypes.STRING,
      deliveryPrice: DataTypes.STRING,
      minOrder: DataTypes.STRING,
      maxTime: DataTypes.STRING,
      minTime: DataTypes.STRING,
      percentageDiscount: DataTypes.STRING,
      discountAmount: DataTypes.STRING,
    },
    {}
  );
  VirtualShop.associate = function (models) {
    VirtualShop.hasMany(models.Product, {
      foreignKey: "shopId",
      as: "products",
    });

    VirtualShop.belongsTo(models.User, {
      foreignKey: "userId",
    });
    VirtualShop.belongsTo(models.ShopType, {
      foreignKey: "shopTypeId",
    });
    VirtualShop.hasMany(models.ShopBanner, {
      foreignKey: "shopId",
      as: "shopBanners",
    });
    VirtualShop.hasMany(models.Social, {
      foreignKey: "shopId",
      as: "socials",
    });
    VirtualShop.hasMany(models.OpeningDay, {
      foreignKey: "shopId",
      as: "openingTimes",
    });
    VirtualShop.hasMany(models.ShopVideo, {
      foreignKey: "shopId",
      as: "shopVideos",
    });
    VirtualShop.hasMany(models.Rating, {
      foreignKey: "shopId",
      as: "ratings",
    });
    VirtualShop.hasMany(models.ProductRating, {
      foreignKey: "shopId",
      as: "productRatings",
    });
    VirtualShop.belongsTo(models.City, { foreignKey: "cityId" });
  };
  return VirtualShop;
};
