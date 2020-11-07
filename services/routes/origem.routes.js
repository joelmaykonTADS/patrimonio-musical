const express = require("express");
const router = express.Router();
const origem = require("../controllers/origem.controller.js");

router.post("/", origem.create);

router.get("/", origem.findAll);

router.get("/:id", origem.findOne);

router.put("/:id", origem.update);

router.delete("/:id", origem.delete);

module.exports = (app) => app.use("/origens", router);
