const { Disco, Faixa } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const { titulo, anoLancamento, capa } = req.body;

      if (!titulo || !anoLancamento || !capa) {
        return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
      }
      
      const disco = await Disco.create({ titulo, anoLancamento, capa });

      return res.redirect("/discos"); 
    } catch (error) {
      console.error(error);
      return res.status(500).send("Erro ao criar disco.");
    }
  },

  async getAll(req, res) {
    try {
      const discos = await Disco.findAll({
        include: {
          model: Faixa,
          as: 'faixas',
        },
      });
  
      return res.render("index", { discos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar discos" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;

      const disco = await Disco.findByPk(id, {
        include: { model: Faixa, as: "faixas" },
      });

      if (!disco) {
        return res.status(404).send("Disco não encontrado.");
      }

      return res.render("details", { disco });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Erro ao buscar disco.");
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anoLancamento, capa } = req.body;
  
      if (typeof capa !== 'string') {
        return res.status(400).json({ error: "A capa deve ser uma string válida." });
      }

      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }
  
      await disco.update({
        titulo,
        anoLancamento,
        capa,  
      });
  
      return res.redirect(`/discos/${id}`);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar disco" });
    }
    console.log(req.body)
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).send("Disco não encontrado.");
      }

      await Faixa.destroy({ where: { disco_id: id } });

      await disco.destroy();

      return res.redirect("/discos");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Erro ao excluir disco.");
    }
  },
};