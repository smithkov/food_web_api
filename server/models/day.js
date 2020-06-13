'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    name: DataTypes.STRING
  }, {});
  Day.associate = function(models) {
    // associations can be defined here
    Day.hasMany(models.OpeningDay, {
      foreignKey: 'dayId',
      as: 'openingDays',
    });
  };
  return Day;
};