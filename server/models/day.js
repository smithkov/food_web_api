'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    name: DataTypes.STRING
  }, {});
  Day.associate = function(models) {
    // associations can be defined here
    Day.hasMany(models.VirtualShop, {
      foreignKey: 'dayId',
      as: 'shops',
    });
  };
  return Day;
};