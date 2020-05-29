'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    total: DataTypes.STRING,
    total: DataTypes.STRING,
    refNo: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Transaction.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
  };
  return Transaction;
};