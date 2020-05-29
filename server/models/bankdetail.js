'use strict';
module.exports = (sequelize, DataTypes) => {
  const BankDetail = sequelize.define('BankDetail', {
    accName: DataTypes.STRING,
    sortCode: DataTypes.STRING,
    accNo: DataTypes.STRING,
    bankName: DataTypes.STRING
  }, {});
  BankDetail.associate = function(models) {
    // associations can be defined here
    BankDetail.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return BankDetail;
};