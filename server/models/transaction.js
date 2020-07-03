"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      total: DataTypes.DECIMAL,
      deliveryPrice: DataTypes.DECIMAL,
      subTotal: DataTypes.DECIMAL,
      offerDiscount: DataTypes.DECIMAL,
      refNo: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {}
  );
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {
      foreignKey: "userId",
    });
    
    Transaction.belongsTo(models.VirtualShop, {
      foreignKey: "shopId",
    });
    Transaction.hasMany(models.SoldProduct, {
      foreignKey: "transactionId",
      as: "soldProducts",
    });
  };
  return Transaction;
};
