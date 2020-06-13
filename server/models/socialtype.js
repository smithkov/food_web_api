'use strict';
module.exports = (sequelize, DataTypes) => {
  const SocialType = sequelize.define('SocialType', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  SocialType.associate = function(models) {
    SocialType.hasMany(models.Social, {
      foreignKey: 'socialTypeId',
      as: 'socials',
    });
  };
  return SocialType;
};