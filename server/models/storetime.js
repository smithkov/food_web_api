'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StoreTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StoreTime.belongsTo(models.VirtualShop, {
        foreignKey: "shopId",
      });
    }
  };
  StoreTime.init({
    Monday: DataTypes.JSONB,
    Tuesday: DataTypes.JSONB,
    Wednesday: DataTypes.JSONB,
    Thursday: DataTypes.JSONB,
    Friday: DataTypes.JSONB,
    Saturday: DataTypes.JSONB,
    Sunday: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'StoreTime',
  });
  return StoreTime;
};