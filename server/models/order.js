"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      tempId: DataTypes.STRING,
      subTotal: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
      orders: DataTypes.JSONB,
      offerDiscount: DataTypes.DECIMAL,
      message: DataTypes.STRING,
      deliveryPrice: DataTypes.DECIMAL,
    },
    {}
  );
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.VirtualShop, {
      foreignKey: "shopId",
    });
  };
  return Order;
};
