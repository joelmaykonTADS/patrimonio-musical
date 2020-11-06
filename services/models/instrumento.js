'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Instrumento.init({
    nome: DataTypes.STRING,
    caracteristica: DataTypes.STRING,
    tombamento: DataTypes.STRING,
    ano: DataTypes.STRING,
    marca: DataTypes.STRING,
    observacoes: DataTypes.STRING,
    componentes: DataTypes.STRING,
    empresa: DataTypes.STRING,
    notaFiscal: DataTypes.STRING,
    valor: DataTypes.STRING,
    data: DataTypes.DATE,
    origemDoacao: DataTypes.STRING,
    observacoesDoacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Instrumento',
  });
  return Instrumento;
};