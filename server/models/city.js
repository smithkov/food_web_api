'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING
  }, {});
  City.associate = function(models) {
    // associations can be defined here
    City.hasMany(models.VirtualShop, {
      foreignKey: 'cityId',
      as: 'shops',
    });
    City.hasMany(models.User, {
      foreignKey: 'cityId',
      as: 'users',
    });
  };
  return City;
};