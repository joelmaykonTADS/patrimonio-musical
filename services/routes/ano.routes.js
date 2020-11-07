const express = require("express");
const router = express.Router();
const ano = require("../controllers/ano.controller.js");

router.post("/", ano.create);

router.get("/", ano.findAll);

router.get("/:id", ano.findOne);

router.put("/:id", ano.update);

router.delete("/:id", ano.delete);

module.exports = (app) => app.use("/anos", router);
