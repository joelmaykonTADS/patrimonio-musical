const express = require("express");
const router = express.Router();
const instrumento = require("../controllers/instrumento.controller.js");

// Create a new student
router.post("/", instrumento.create);

module.exports = (app) => app.use("/instrumentos", router);
