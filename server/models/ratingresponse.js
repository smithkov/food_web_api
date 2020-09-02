'use strict';
module.exports = (sequelize, DataTypes) => {
  const RatingResponse = sequelize.define('RatingResponse', {
    content: DataTypes.STRING
  }, {});
  
  RatingResponse.associate = function(models) {
    // associations can be defined here
    RatingResponse.belongsTo(models.Rating, {
      foreignKey: 'ratingId'
    });
    RatingResponse.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    RatingResponse.belongsTo(models.VirtualShop, {
      foreignKey: 'shopId'
    });
  };
  return RatingResponse;
};