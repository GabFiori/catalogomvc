const { Faixa, Disco } = require("../models");

module.exports = {
  // Criar uma nova faixa
  async create(req, res) {
    try {
      const { nome, duracao, disco_id } = req.body;

      if (!nome || !duracao || !disco_id) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }

      // Verificando se o disco existe
      const disco = await Disco.findByPk(disco_id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }

      // Criando a faixa associada ao disco
      const faixa = await Faixa.create({
        nome,
        duracao,
        disco_id, // Associando a faixa ao disco
      });

      return res.status(201).json(faixa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar faixa" });
    }
  },

  // Obter todas as faixas
  async getAll(req, res) {
    try {
      const faixas = await Faixa.findAll({
        include: {
          model: Disco,
          as: 'disco', // Incluir o disco associado à faixa
        },
      });
      return res.status(200).json(faixas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar faixas" });
    }
  },

  // Obter faixa por ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const faixa = await Faixa.findByPk(id, {
        include: {
          model: Disco,
          as: 'disco', // Incluir o disco associado à faixa
        },
      });
      if (!faixa) {
        return res.status(404).json({ error: "Faixa não encontrada" });
      }

      return res.status(200).json(faixa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar faixa" });
    }
  },

  // Atualizar uma faixa
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, duracao, disco_id } = req.body;

      const faixa = await Faixa.findByPk(id);
      if (!faixa) {
        return res.status(404).json({ error: "Faixa não encontrada" });
      }

      // Verificando se o disco existe
      const disco = await Disco.findByPk(disco_id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }

      // Atualizando a faixa
      await faixa.update({
        nome,
        duracao,
        disco_id,
      });

      return res.status(200).json(faixa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar faixa" });
    }
  },

  // Deletar uma faixa
  async delete(req, res) {
    try {
      const { id } = req.params;

      const faixa = await Faixa.findByPk(id);
      if (!faixa) {
        return res.status(404).json({ error: "Faixa não encontrada" });
      }

      await faixa.destroy();
      return res.status(200).json({ message: "Faixa excluída com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir faixa" });
    }
  },
};