'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
    name: DataTypes.STRING,
    imagePath: DataTypes.STRING
  }, {});
  SubCategory.associate = function(models) {
    SubCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  };
  return SubCategory;
};