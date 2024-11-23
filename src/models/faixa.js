'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Faixa extends Model {
    static associate(models) {
      Faixa.belongsTo(models.Disco, {
        foreignKey: 'discoId',
        as: 'disco'
      });
    }
  }
  Faixa.init(
    {
      nome: DataTypes.STRING,
      duracao: DataTypes.STRING,
      discoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Faixa',
    }
  );
  return Faixa;
};
