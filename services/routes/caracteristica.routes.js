const express = require("express");
const router = express.Router();
const caracterisitica = require("../controllers/caracteristica.controller.js");

router.post("/", caracterisitica.create);

router.get("/", caracterisitica.findAll);

router.get("/:id", caracterisitica.findOne);

router.put("/:id", caracterisitica.update);

router.delete("/:id", caracterisitica.delete);

module.exports = (app) => app.use("/caracteristicas", router);
