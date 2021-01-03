const express = require("express");
const router = express.Router();
const irmao = require("../../controllers/secretaria/irmao.controller.js");

router.post("/", irmao.create);

router.get("/", irmao.findAll);

router.get("/:id", irmao.findOne);

router.put("/:id", irmao.update);

router.delete("/:id", irmao.delete);

module.exports = (app) => app.use("/irmaos", router);
