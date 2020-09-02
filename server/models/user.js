'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    ip: DataTypes.STRING,
    email: DataTypes.STRING,
    expiry: DataTypes.DATE,
    phone: DataTypes.STRING,
    source: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    photo: DataTypes.STRING,
    firstAddress: DataTypes.STRING,
    secondAddress: DataTypes.STRING,
    
    postCode: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Role, {
      foreignKey: 'roleId'
    });
    User.belongsTo(models.Status, {
      foreignKey: 'statusId'
    });
   
    
    User.hasMany(models.Product, {
      foreignKey: 'userId',
      as: 'products',
    });
    User.hasMany(models.Transaction, {
      foreignKey: 'userId',
      as: 'transactions',
    });
    User.hasMany(models.BankDetail, {
      foreignKey: 'userId',
      as: 'bankDetails',
    });
    User.hasMany(models.CardDetail, {
      foreignKey: 'userId',
      as: 'cardDetails',
    });
    User.hasMany(models.VirtualShop, {
      foreignKey: 'userId',
      as: 'shops',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      as: 'ratings',
    });
    User.hasMany(models.RatingResponse, {
      foreignKey: 'userId',
      as: 'ratingResponses',
    });

    User.hasMany(models.ProductRating, {
      foreignKey: 'userId',
      as: 'productRatings',
    });
    User.hasMany(models.ProductRatingResponse, {
      foreignKey: 'userId',
      as: 'productRatingResponses'
    });

    User.belongsTo(models.City, { foreignKey: "cityId" });
  };
  return User;
};