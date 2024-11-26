'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disco extends Model {
    static associate(models) {
      this.hasMany(models.Faixa, {
        foreignKey: 'disco_id',
        as: 'faixas',
      });
    }
  }
  Disco.init({
    titulo: DataTypes.STRING,
    anoLancamento: DataTypes.INTEGER,
    capa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Disco',
  });
  return Disco;
};