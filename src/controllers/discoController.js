const { Disco, Faixa } = require("../models");

module.exports = {
  // Criar disco com faixas associadas
  async create(req, res) {
    try {
      const { titulo, anoLancamento, capa } = req.body;

      if (!titulo || !anoLancamento || !capa) {
        return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
      }

      // Criar o disco
      const disco = await Disco.create({ titulo, anoLancamento, capa });

      return res.redirect("/discos"); // Redirecionar para a página inicial
    } catch (error) {
      console.error(error);
      return res.status(500).send("Erro ao criar disco.");
    }
  },

  // Obter todos os discos e renderizar a página inicial
  async getAll(req, res) {
    try {
      const discos = await Disco.findAll({
        include: {
          model: Faixa,
          as: 'faixas',
        },
      });
  
      // Renderizando a página 'index' e passando os discos para a view
      return res.render("index", { discos }); // Mude de res.json para res.render
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar discos" });
    }
  },

  // Obter detalhes de um disco e suas faixas
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

  /*async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anoLancamento, capa } = req.body;
  
      // Verificar se o disco existe
      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }
  
      // Atualizando o disco com os novos valores
      await disco.update({
        titulo,
        anoLancamento,
        capa // A 'capa' é uma string, então deve ser tratada como tal
      });
  
      // Redireciona para a página de detalhes do disco atualizado
      return res.redirect(`/discos/${id}`);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar disco" });
    }
  },*/

  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anoLancamento, capa } = req.body;
  
      // Garantir que a capa seja uma string
      if (typeof capa !== 'string') {
        return res.status(400).json({ error: "A capa deve ser uma string válida." });
      }
  
      // Verificando se o disco existe
      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).json({ error: "Disco não encontrado" });
      }
  
      // Atualizando o disco
      await disco.update({
        titulo,
        anoLancamento,
        capa,  // Capa agora é garantida como string
      });
  
      return res.redirect(`/discos/${id}`);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar disco" });
    }
    console.log(req.body)
  },

  // Deletar disco e faixas associadas
  async delete(req, res) {
    try {
      const { id } = req.params;

      const disco = await Disco.findByPk(id);
      if (!disco) {
        return res.status(404).send("Disco não encontrado.");
      }

      // Deletar faixas associadas
      await Faixa.destroy({ where: { disco_id: id } });

      // Deletar disco
      await disco.destroy();

      return res.redirect("/discos");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Erro ao excluir disco.");
    }
  },
};
