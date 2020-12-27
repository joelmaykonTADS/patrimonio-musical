const express = require("express");
const router = express.Router();
const empresa = require("../../controllers/patrimonio/empresa.controller.js");

router.post("/", empresa.create);

router.get("/", empresa.findAll);

router.get("/:id", empresa.findOne);

router.put("/:id", empresa.update);

router.delete("/:id", empresa.delete);

module.exports = (app) => app.use("/empresas", router);
