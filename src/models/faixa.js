'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Faixa extends Model {
    static associate(models) {
      this.belongsTo(models.Disco, {
        foreignKey: 'disco_id',
        as: 'disco',
      });
    }
  }
  Faixa.init({
    nome: DataTypes.STRING,
    duracao: DataTypes.INTEGER,
    disco_id: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Faixa',
  });
  return Faixa;
};
