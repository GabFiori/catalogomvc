const { Disco, Faixa } = require("../models");

module.exports = {
  // Criar disco com faixas associadas
  async create(req, res) {
    try {
      const { titulo, anoLancamento, capa, faixas } = req.body;

      if (!titulo || !anoLancamento || !capa) {
        return res.status(400).json({ error: "Todos os campos obrigatórios do disco precisam ser preenchidos." });
      }

      // Criando o disco
      const disco = await Disco.create({
        titulo,
        anoLancamento,
        capa,
      });

      // Criando faixas associadas ao disco
      if (faixas && faixas.length > 0) {
        for (const faixa of faixas) {
          await Faixa.create({
            nome: faixa.nome,
            duracao: faixa.duracao,
            disco_id: disco.id, // Associando a faixa ao disco
          });
        }
      }

      return res.status(201).json(disco);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar disco" });
    }
  },

  // Obter todos os discos com suas faixas associadas
  async getAll(req, res) {
    try {
      const discos = await Disco.findAll({
        include: {
          model: Faixa,
          as: 'faixas', // Inclui as faixas associadas a cada disco
        },
      });
      return res.status(200).json(discos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar discos" });
    }
  },

  // Obter disco por ID, incluindo suas faixas
  async getById(req, res) {
    try {
      const { id } = req.params;

      const disco = await Disco.findByPk(id, {
        include: {
          model: Faixa,
          as: 'faixas', // Incluir as faixas associadas ao disco
        },
      });

      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }

      return res.status(200).json(disco);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar disco" });
    }
  },

  // Atualizar disco (não vamos alterar as faixas aqui, mas podemos permitir a atualização de faixas relacionadas)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anoLancamento, capa } = req.body;

      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }

      await disco.update({
        titulo,
        anoLancamento,
        capa,
      });

      return res.status(200).json(disco);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar disco" });
    }
  },

  // Deletar disco e suas faixas associadas
  async delete(req, res) {
    try {
      const { id } = req.params;

      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }

      // Deletando faixas associadas
      await Faixa.destroy({
        where: {
          disco_id: id,
        },
      });

      // Deletando o disco
      await disco.destroy();

      return res.status(200).json({ message: "Disco excluído com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir disco" });
    }
  },
};
