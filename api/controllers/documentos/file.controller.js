const {
  uploadFileToStorage,
  downloadFileStorage,
} = require("../../services/documentos/file");

exports.upload = async (req, res) => {
  let file = req.file;
  const localization = req.body.path;
  console.log(localization);
  if (file) {
    uploadFileToStorage(file, localization)
      .then((success) => {
        res.status(200).send({
          status: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send({
          status: "error",
          error,
        });
      });
  }
};

exports.download = async (req, res) => {
  const { name } = req.body;
  if (name) {
    downloadFileStorage(name)
      .then((success) => {
        res.status(200).send({
          status: "success",
          data:success
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send({
          status: "error",
          error,
        });
      });
  }
};
