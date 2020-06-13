'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    value: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
    Rating.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Rating.hasMany(models.RatingResponse, {
      foreignKey: 'ratingId',
      as: 'ratingResponses',
    });
  };
  return Rating;
};