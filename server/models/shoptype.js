'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShopType = sequelize.define('ShopType', {
    name: DataTypes.STRING
  }, {});
  ShopType.associate = function(models) {
    ShopType.hasMany(models.Category, {
      foreignKey: 'shopTypeId',
      as: 'categories',
    });
    ShopType.hasMany(models.VirtualShop, {
      foreignKey: 'shopTypeId',
      as: 'shops',
    });
  };
  return ShopType;
};