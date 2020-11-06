const models = require("../models");
const Instrumento = models.Instrumento;

exports.create = async (req, res) => {
  // Create a instrument
  const instrumento = {
    nome: req.body.nome,
    tombamento: req.body.tombamento,
    caracteristica:req.body.caracteristica,
    aquisicao:req.body.aquisicao,
    marca:req.body.marca,
    naipe:req.body.naipe,
    ano:req.body.ano,
    descricao: req.body.descricao,
  };

  const instrumentoExist = await Instrumento.findOne({
    where: { tombamento: instrumento.tombamento },
  });

  if (!instrumentoExist) {
    // Save student in the database
    Instrumento.create(instrumento)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "A Problem occurred while creating the Instrument.",
        });
      });
  } else {
    res.status(400).send({
      message: `The Instrument  has data ${
        instrumento.tombamento ? `Tombamento: ${instrumento.tombamento}` : ``
      } duplicate.`,
    });
  }
};
