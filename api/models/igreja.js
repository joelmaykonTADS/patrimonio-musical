'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Igreja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Igreja.init({
    cep: DataTypes.STRING,
    cidade: DataTypes.STRING,
    bairro: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    comum: DataTypes.STRING,
    codigo: DataTypes.STRING,
    encarregadoRegional: DataTypes.STRING,
    encarregadoLocal: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Igreja',
  });
  return Igreja;
};