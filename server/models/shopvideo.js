'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShopVideo = sequelize.define('ShopVideo', {
    videoUrl: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  ShopVideo.associate = function(models) {
    // associations can be defined here
    ShopVideo.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return ShopVideo;
};