"use strict";
module.exports = (sequelize, DataTypes) => {
  const VirtualShop = sequelize.define(
    "VirtualShop",
    {
      shopName: DataTypes.STRING,
      logo: DataTypes.STRING,
      banner: DataTypes.STRING,
      totalSale: DataTypes.STRING,
      bio: DataTypes.STRING,
      firstAddress: DataTypes.STRING,
      secondAddress: DataTypes.STRING,
      postCode: DataTypes.STRING,
      hasIdVerified: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      verificationCode: DataTypes.STRING,
      shopUrl: DataTypes.STRING,
      phone: DataTypes.STRING,
      phoneVerifyCode: DataTypes.STRING,
      notice: DataTypes.TEXT,
      about: DataTypes.TEXT,
      hasEmailVerified: DataTypes.BOOLEAN,
      isPreOrder: DataTypes.BOOLEAN,
      deliveryPrice: DataTypes.STRING,
      minOrder: DataTypes.STRING,
      maxTime: DataTypes.STRING,
      minTime: DataTypes.STRING,
      percentageDiscount: DataTypes.STRING,
      discountAmount: DataTypes.STRING,
      prepareTime: DataTypes.JSONB,
      bankDetail: DataTypes.JSONB,
      proofOfIdentity: DataTypes.JSONB,
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
    VirtualShop.belongsTo(models.Origin, {
      foreignKey: 'originId'
    });
   
    VirtualShop.hasMany(models.Social, {
      foreignKey: "shopId",
      as: "socials",
    });
    VirtualShop.hasMany(models.PostCode, {
      foreignKey: "shopId",
      as: "postCodes",
    });
    VirtualShop.hasMany(models.OpeningDay, {
      foreignKey: "shopId",
      as: "openingTimes",
    });
    VirtualShop.hasMany(models.StoreTime, {
      foreignKey: "shopId",
      as: "storeTime",
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
    // VirtualShop.hasMany(models.ProductRatingResponse, {
    //   foreignKey: "shopId",
    //   as: "ratingResponses",
    // });
    VirtualShop.hasMany(models.Order, {
      foreignKey: "shopId",
      as: "carts",
    });
    VirtualShop.hasMany(models.Transaction, {
      foreignKey: "shopId",
      as: "transactions",
    });

    VirtualShop.belongsTo(models.City, { foreignKey: "cityId" });
  };
  return VirtualShop;
};
