'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostCode = sequelize.define('PostCode', {
    code: DataTypes.STRING,
  }, {});
  PostCode.associate = function(models) {
    PostCode.belongsTo(models.VirtualShop, {
      foreignKey: "shopId",
    });
  };
  return PostCode;
};