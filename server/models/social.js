'use strict';
module.exports = (sequelize, DataTypes) => {
  const Social = sequelize.define('Social', {
    twitter: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING
  }, {});
  Social.associate = function(models) {
    
    Social.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return Social;
};