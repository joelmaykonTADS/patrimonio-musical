const express = require("express");
const router = express.Router();
const file = require('../../controllers/documentos/file.controller')   
const {multer} = require('../../config/multer')

router.post("/upload", multer.single("file"), file.upload);
router.post("/download", multer.single("file"), file.download);

module.exports = (app) => app.use("/file", router);