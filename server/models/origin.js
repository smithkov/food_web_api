'use strict';
module.exports = (sequelize, DataTypes) => {
  const Origin = sequelize.define('Origin', {
    name: DataTypes.STRING
  }, {});
  Origin.associate = function(models) {
    // associations can be defined here
    Origin.hasMany(models.Product, {
      foreignKey: 'originId',
      as: 'products',
    });
  };
  return Origin;
};