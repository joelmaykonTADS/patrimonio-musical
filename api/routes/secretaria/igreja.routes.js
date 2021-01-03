const express = require("express");
const router = express.Router();
const igreja = require("../../controllers/secretaria/igreja.controller.js");

router.post("/", igreja.create);

router.get("/", igreja.findAll);

router.get("/:id", igreja.findOne);

router.put("/:id", igreja.update);

router.delete("/:id", igreja.delete);

module.exports = (app) => app.use("/igrejas", router);
