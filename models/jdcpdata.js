'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JDCPData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  JDCPData.init({
    key: DataTypes.INTEGER,
    clause: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'JDCPData',
    timestamps: false
  });
  return JDCPData;
};