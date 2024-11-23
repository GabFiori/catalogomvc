'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disco extends Model {
    static associate(models) {
      Disco.hasMany(models.Faixa, {
        foreignKey: 'discoId',
        as: 'faixas'
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