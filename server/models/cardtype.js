'use strict';
module.exports = (sequelize, DataTypes) => {
  const CardType = sequelize.define('CardType', {
    name: DataTypes.STRING
  }, {});
  CardType.associate = function(models) {
    // associations can be defined here
    CardType.hasMany(models.CardDetail, {
      foreignKey: 'cardTypeId',
      as: 'cardDetails',
    });
  };
  return CardType;
};