const express = require("express");
const router = express.Router();
const tombamento = require("../../controllers/patrimonio/tombamento.controller.js");

router.post("/", tombamento.create);

router.get("/", tombamento.findAll);

router.get("/:id", tombamento.findOne);

router.put("/:id", tombamento.update);

router.delete("/:id", tombamento.delete);

module.exports = (app) => app.use("/tombamentos", router);
