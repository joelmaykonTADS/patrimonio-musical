const express = require("express");
const router = express.Router();
const nome = require("../controllers/nome.controller.js");

router.post("/", nome.create);

router.get("/", nome.findAll);

router.get("/:id", nome.findOne);

router.put("/:id", nome.update);

router.delete("/:id", nome.delete);

module.exports = (app) => app.use("/nomes", router);
