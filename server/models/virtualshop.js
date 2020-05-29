'use strict';
module.exports = (sequelize, DataTypes) => {
  const VirtualShop = sequelize.define('VirtualShop', {
    shopName: DataTypes.STRING,
    logo: DataTypes.STRING,
    totalSale: DataTypes.STRING,
    bio: DataTypes.STRING,
    openingTime: DataTypes.STRING,
    closingTime: DataTypes.STRING
  }, {});
  VirtualShop.associate = function(models) {
    // associations can be defined here
    VirtualShop.hasOne(models.BusinessAddress, {
      foreignKey: 'virtualShopId'
    });
    VirtualShop.hasMany(models.Product, {
      foreignKey: 'shopId',
      as: 'products',
    });
    VirtualShop.belongsTo(models.Day, {
      foreignKey: 'dayId'
    });
    VirtualShop.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    VirtualShop.belongsTo(models.ShopType, {
      foreignKey: 'shopTypeId'
    });
    VirtualShop.hasMany(models.ShopBanner, {
      foreignKey: 'shopId',
      as: 'shopBanners',
    });
    VirtualShop.hasMany(models.ShopVideo, {
      foreignKey: 'shopId',
      as: 'shopVideos',
    });
    
  };
  return VirtualShop;
};