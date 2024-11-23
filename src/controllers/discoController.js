const { Disco } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const { titulo, anoLancamento, capa } = req.body;
      const disco = await Disco.create({ titulo, anoLancamento, capa });
      return res.status(201).json(disco);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar disco" });
    }
  },

  async getAll(req, res) {
    try {
      const discos = await Disco.findAll();
      return res.status(200).json(discos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar discos" });
    }
  },
};
