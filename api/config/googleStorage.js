'use strict';

require("dotenv/config");
const path = require('path')

const {Storage} = require("@google-cloud/storage");
const storage = new Storage ({
  projectId: process.env.FIREBASE_API_PATRIMONIO,
  keyFilename: path.join(__dirname,'../auth/gc.patrimonio.json'),
});

const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET); 

module.exports = { bucket, storage };
