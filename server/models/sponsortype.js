'use strict';
module.exports = (sequelize, DataTypes) => {
  const SponsorType = sequelize.define('SponsorType', {
    name: DataTypes.STRING,
    price: DataTypes.STRING
  }, {});
  SponsorType.associate = function(models) {
    // associations can be defined here
    SponsorType.hasMany(models.Sponsor, {
      foreignKey: 'sponsorTypeId',
      as: 'sponsors',
    });
  };
  return SponsorType;
};