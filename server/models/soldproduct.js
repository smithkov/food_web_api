"use strict";
module.exports = (sequelize, DataTypes) => {
  const SoldProduct = sequelize.define(
    "SoldProduct",
    {
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
      name: DataTypes.STRING,
    },
    {}
  );
  SoldProduct.associate = function (models) {
    // associations can be defined here
    SoldProduct.belongsTo(models.Product, {
      foreignKey: "productId",
    });
    SoldProduct.belongsTo(models.Transaction, {
      foreignKey: "transactionId",
    });
  };
  return SoldProduct;
};
