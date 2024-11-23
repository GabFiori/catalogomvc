const { Router } = require("express");
const discoController = require("../controllers/discoController");

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.post("/discos", discoController.create); 
routes.get("/discos", discoController.getAll); 

module.exports = routes;