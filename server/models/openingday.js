'use strict';
module.exports = (sequelize, DataTypes) => {
  const OpeningDay = sequelize.define('OpeningDay', {
    opening: DataTypes.TIME,
    closing: DataTypes.TIME
  }, {});
  OpeningDay.associate = function(models) {
    // associations can be defined here
    OpeningDay.belongsTo(models.Day, {
      foreignKey: 'dayId'
    });
    OpeningDay.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return OpeningDay;
};