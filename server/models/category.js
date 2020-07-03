'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    imagePath: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.SubCategory, {
      foreignKey: 'categoryId',
      as: 'subCategories',
    });
    
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products',
    });
  };
  return Category;
};