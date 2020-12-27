const {
  uploadFileToStorage,
  downloadFileStorage,
} = require("../../services/documentos/file");

exports.upload = async (req, res) => {
  let file = req.file;
  if (file) {
    uploadFileToStorage(file)
      .then((success) => {
        res.status(200).send({
          status: "success",
          url:success
        });
      })
      .catch((error) => {
        res.status(400).send({
          status: "error",
          error,
        });
      });
  }
};

exports.download = async (req, res) => {
  const { url } = req.body;
  if (url) {
    downloadFileStorage(url)
      .then((success) => {
        res.status(200).send({
          status: "success",
          data: success,
        });
      })
      .catch((error) => {
        res.status(400).send({
          status: "error",
          error,
        });
      });
  }
};
