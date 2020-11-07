const express = require("express");
const router = express.Router();
const marca = require("../controllers/marca.controller.js");

router.post("/", marca.create);

router.get("/", marca.findAll);

router.get("/:id", marca.findOne);

router.put("/:id", marca.update);

router.delete("/:id", marca.delete);

module.exports = (app) => app.use("/marcas", router);
