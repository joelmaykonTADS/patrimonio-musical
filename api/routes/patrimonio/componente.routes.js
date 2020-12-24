const express = require("express");
const router = express.Router();
const componente = require("../../controllers/patrimonio/componente.controller.js");

router.post("/", componente.create);

router.get("/", componente.findAll);

router.get("/:id", componente.findOne);

router.put("/:id", componente.update);

router.delete("/:id", componente.delete);

module.exports = (app) => app.use("/componentes", router);
