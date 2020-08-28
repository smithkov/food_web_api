'use strict';
module.exports = (sequelize, DataTypes) => {
  const Origin = sequelize.define('Origin', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  Origin.associate = function(models) {
    // associations can be defined here
    Origin.hasMany(models.Product, {
      foreignKey: 'originId',
      as: 'products',
    });
    Origin.hasMany(models.VirtualShop, {
      foreignKey: 'originId',
      as: 'shops',
    });
  };
  return Origin;
};