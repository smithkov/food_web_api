'use strict';
module.exports = (sequelize, DataTypes) => {
  const CardDetail = sequelize.define('CardDetail', {
    cardNo: DataTypes.STRING,
    expiryDate: DataTypes.STRING,
    address: DataTypes.STRING,
    holderName: DataTypes.STRING
  }, {});
  CardDetail.associate = function(models) {
    // associations can be defined here
    CardDetail.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    CardDetail.belongsTo(models.CardType, {
      foreignKey: 'cardTypeId'
    });
  };
  return CardDetail;
};