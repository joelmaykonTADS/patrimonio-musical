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
      instrumento.hasMany(models.caracteristica, { foreignKey: "caracteristicaId", as: "caracteristica" });
      instrumento.hasMany(models.formaAquisicao, { foreignKey: "aquisicaoId", as: "aquisicao" });
      instrumento.hasMany(models.marca, { foreignKey: "marcaId", as: "marca" });
      instrumento.hasMany(models.naipe, { foreignKey: "naipeId", as: "naipe" });
      instrumento.hasMany(models.ano, { foreignKey: "anoId", as: "ano" });
    }
  }
  instrumento.init(
    {
      nomeId: DataTypes.INTEGER,
      tombamentoId:DataTypes.INTEGER,
      caracteristicaId:DataTypes.INTEGER,
      aquisicaoId:DataTypes.INTEGER,
      marcaId:DataTypes.INTEGER,
      naipeId:DataTypes.INTEGER,
      anoId:DataTypes.INTEGER,
      descricao: DataTypes.STRING      
    },
    {
      sequelize,
      modelName: "instrumento",
    }
  );
  return instrumento;
};
