'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: DataTypes.STRING
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
    Status.hasMany(models.User, {
      foreignKey: 'statusId',
      as: 'users',
    });
  };
  return Status;
};