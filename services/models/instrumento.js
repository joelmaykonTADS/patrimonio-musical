"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class instrumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      instrumento.hasMany(models.nome, { foreignKey: "nomeId", as: "nome" });
      instrumento.hasMany(models.tombamento, { foreignKey: "tombamentoId", as: "tombamento" });
    }
  }
  instrumento.init(
    {
      nomeId: DataTypes.INTEGER,
      tombamentoId:DataTypes.INTEGER,
      descricao: DataTypes.STRING      
    },
    {
      sequelize,
      modelName: "instrumento",
    }
  );
  return instrumento;
};
