'use strict';
module.exports = (sequelize, DataTypes) => {
  const HomeAddress = sequelize.define('HomeAddress', {
    firstAddress: DataTypes.STRING,
    secondAddress: DataTypes.STRING,
    postCode: DataTypes.STRING
  }, {});
  HomeAddress.associate = function(models) {
    // associations can be defined here
    HomeAddress.belongsTo(models.User, {foreignKey: 'userId'});
    HomeAddress.belongsTo(models.City, {foreignKey: 'cityId'});
  };
  return HomeAddress;
};