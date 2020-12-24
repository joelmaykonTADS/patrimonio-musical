const { bucket, storage } = require("../../config/googleStorage");
const { format } = require("util");

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadFileToStorage = (file, localization) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    let newFileName = `${Date.now()}_${file.originalname}`;
    let fileUpload = bucket.file(newFileName);
    const blobStream = fileUpload.createWriteStream({
      resumable: false,
      gzip: true,
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobStream.on("error", (error) => {
      reject("Something is wrong! Unable to upload at the moment.");
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(
        `${process.env.FIREBASE_DATABASE_URL}/${bucket.name}/${localization}/${fileUpload.name}`
      );
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

const downloadFileStorage = async (filename) => {
  const file = await storage.bucket(bucket.name).file(filename).download();
  const b64 = new Buffer.from(file[0]).toString('base64');   
  return b64
};

module.exports = { uploadFileToStorage, downloadFileStorage };
