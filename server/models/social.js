'use strict';
module.exports = (sequelize, DataTypes) => {
  const Social = sequelize.define('Social', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Social.associate = function(models) {
    Social.belongsTo(models.SocialType, {
      foreignKey: 'socialTypeId'
    });
    Social.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return Social;
};