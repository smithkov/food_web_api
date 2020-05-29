'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessAddress = sequelize.define('BusinessAddress', {
    firstAddress: DataTypes.STRING,
    secondAddress: DataTypes.STRING,
    postCode: DataTypes.STRING
  }, {});
  BusinessAddress.associate = function(models) {
    // associations can be defined here
    BusinessAddress.belongsTo(models.VirtualShop, {foreignKey: 'shopId'});
    BusinessAddress.belongsTo(models.City, {foreignKey: 'cityId'});
  };
  return BusinessAddress;
};