'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShopBanner = sequelize.define('ShopBanner', {
    bannerPath: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  ShopBanner.associate = function(models) {
    // associations can be defined here
    ShopBanner.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return ShopBanner;
};