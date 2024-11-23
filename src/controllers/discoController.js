const { Disco, Faixa } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const { titulo, anoLancamento, capa, faixas } = req.body;
  
      if (!titulo || !anoLancamento || !capa) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }
  
      const disco = await Disco.create({ titulo, anoLancamento, capa });
  
      if (faixas && faixas.length > 0) {
        for (const faixa of faixas) {
          await Faixa.create({
            nome: faixa.nome,
            duracao: faixa.duracao,
            discoId: disco.id, 
          });
        }
      }
  
      const discoCompleto = await Disco.findByPk(disco.id, {
        include: { model: Faixa, as: 'faixas' },
      });
      return res.status(201).json(discoCompleto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar disco" });
    }
  },

  async getAll(req, res) {
    try {
      const discos = await Disco.findAll({
        include: { model: Faixa, as: 'faixas' }, 
      });
      return res.status(200).json(discos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar discos" });
    }
  },


  async getById(req, res) {
    try {
      const { id } = req.params;
  
      const disco = await Disco.findByPk(id, {
        include: { model: Faixa, as: 'faixas' }, 
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

  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anoLancamento, capa } = req.body;
  
      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }
  
      await disco.update({ titulo, anoLancamento, capa });
      return res.status(200).json(disco);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar disco" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
  
      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }
  
      // Exclui o disco
      await disco.destroy();
      return res.status(200).json({ message: "Disco excluído com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir disco" });
    }
  },
};
