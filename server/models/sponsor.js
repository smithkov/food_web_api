'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sponsor = sequelize.define('Sponsor', {
    noOfDays: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    totalCost: DataTypes.STRING
  }, {});
  Sponsor.associate = function(models) {
    // associations can be defined here
    Sponsor.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
    Sponsor.belongsTo(models.SponsorType, {
      foreignKey: 'sponsorTypeId'
    });
  };
  return Sponsor;
};