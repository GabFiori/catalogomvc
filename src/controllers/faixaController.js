const { Faixa, Disco } = require("../models");

module.exports = {
  // Criar uma nova faixa em um disco específico
  async create(req, res) {
    try {
      const { discoId } = req.params;
      const { nome, duracao } = req.body;

      // Verifica se o disco existe
      const disco = await Disco.findByPk(discoId);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }

      // Cria a faixa e associa ao disco
      const faixa = await Faixa.create({ nome, duracao, discoId });
      return res.status(201).json(faixa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar faixa" });
    }
  },

  // Listar todas as faixas de um disco específico
  async getAll(req, res) {
    try {
      const { discoId } = req.params;

      // Verifica se o disco existe
      const disco = await Disco.findByPk(discoId);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }

      // Busca as faixas associadas ao disco
      const faixas = await Faixa.findAll({ where: { discoId } });
      return res.status(200).json(faixas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar faixas" });
    }
  },

  // Atualizar uma faixa específica
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, duracao } = req.body;

      // Busca a faixa pelo ID
      const faixa = await Faixa.findByPk(id);
      if (!faixa) {
        return res.status(404).json({ error: "Faixa não encontrada" });
      }

      // Atualiza os dados da faixa
      await faixa.update({ nome, duracao });
      return res.status(200).json(faixa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar faixa" });
    }
  },

  // Excluir uma faixa de um disco
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Busca a faixa pelo ID
      const faixa = await Faixa.findByPk(id);
      if (!faixa) {
        return res.status(404).json({ error: "Faixa não encontrada" });
      }

      // Exclui a faixa
      await faixa.destroy();
      return res.status(200).json({ message: "Faixa excluída com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir faixa" });
    }
  },

};
