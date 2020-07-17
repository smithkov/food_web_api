'use strict';
module.exports = (sequelize, DataTypes) => {
  const OpeningDay = sequelize.define('OpeningDay', {
    opening: DataTypes.DATE,
    closing: DataTypes.DATE,
    day: DataTypes.STRING,
    checked: DataTypes.BOOLEAN
  }, {});
  OpeningDay.associate = function(models) {
    // associations can be defined here
    OpeningDay.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return OpeningDay;
};