const express = require("express");
const router = express.Router();
const instrumento = require("../controllers/instrumento.controller.js");

router.post("/", instrumento.create);

router.get("/", instrumento.findAll);

router.get("/:id", instrumento.findOne);

router.put("/:id", instrumento.update);

router.delete("/:id", instrumento.delete);

module.exports = (app) => app.use("/instrumentos", router);
