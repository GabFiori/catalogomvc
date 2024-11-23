const { Router } = require("express");
const discoController = require("../controllers/discoController");
const faixaController = require("../controllers/faixaController"); 

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.post("/discos", discoController.create);
routes.get("/discos", discoController.getAll); 
routes.get("/discos/:id", discoController.getById); 
routes.put("/discos/:id", discoController.update); 
routes.delete("/discos/:id", discoController.delete); 

routes.post("/faixas", faixaController.create); 
routes.get("/faixas", faixaController.getAll); 
routes.get("/faixas/:id", faixaController.getById); 
routes.put("/faixas/:id", faixaController.update); 
routes.delete("/faixas/:id", faixaController.delete); 

module.exports = routes;
