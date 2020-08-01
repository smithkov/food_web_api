"use strict";

module.exports = (sequelize, DataTypes) => {
  const OpeningDay = sequelize.define(
    "OpeningDay",
    {
      opening: DataTypes.DATE,
      closing: DataTypes.DATE,
      oTime: DataTypes.TIME,
      cTime: DataTypes.TIME,
      day: DataTypes.STRING,
      dayNum: DataTypes.INTEGER,
      checked: DataTypes.BOOLEAN
    },
    {}
  );
  OpeningDay.associate = function (models) {
    // associations can be defined here
    OpeningDay.belongsTo(models.VirtualShop, {
      foreignKey: "shopId",
    });
  };
  return OpeningDay;
};
