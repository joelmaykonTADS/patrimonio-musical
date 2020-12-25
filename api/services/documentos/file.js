const { bucket, storage } = require("../../config/googleStorage");
const { format } = require("util");
const uuid = require("uuid");

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadFileToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    const newFileName = `${uuid.v4()}.${file.originalname.split(".").pop()}`;
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
        `${process.env.FIREBASE_DATABASE_URL}/${bucket.name}/${fileUpload.name}`
      );
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

const downloadFileStorage = async (url) => {
  const fileName = url.split("/").pop();
  const file = await storage.bucket(bucket.name).file(fileName).download();
  const b64 = new Buffer.from(file[0]).toString("base64");
  return b64;
};

module.exports = { uploadFileToStorage, downloadFileStorage };
