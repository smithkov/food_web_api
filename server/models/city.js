'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING
  }, {});
  City.associate = function(models) {
    // associations can be defined here
    City.hasMany(models.BusinessAddress, {
      foreignKey: 'cityId',
      as: 'businessAddresses',
    });
    City.hasMany(models.HomeAddress, {
      foreignKey: 'cityId',
      as: 'homeAddresses',
    });
  };
  return City;
};