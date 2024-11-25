const { Router } = require("express");
const discoController = require("../controllers/discoController");
const faixaController = require("../controllers/faixaController");

const routes = Router();

routes.get("/", (req, res) => res.redirect("/discos"));
routes.get("/discos", discoController.getAll);
routes.post("/discos", discoController.create);
routes.get("/discos/:id", discoController.getById);
routes.post("/discos/:id", discoController.update);
routes.post("/discos/:id/delete", discoController.delete);

routes.post("/faixas", faixaController.create);  // Adicionar faixa
routes.put("/faixas/:id", faixaController.update);  // Editar faixa
routes.delete("/faixas/:id", faixaController.delete);  // Deletar faixa

module.exports = routes;
