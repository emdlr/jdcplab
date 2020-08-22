'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jdcpdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  jdcpdata.init({
    key: DataTypes.INTEGER,
    clause: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jdcpdata',
  });
  return jdcpdata;
};