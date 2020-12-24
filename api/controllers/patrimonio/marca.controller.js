const models = require("../../models/patrimonio");
const Marca = models.Marca;

exports.create = async (req, res) => {
  const marca = { nome: req.body.nome };
  const marcaExist = await Marca.findOne({
    where: { nome: marca.nome },
  });
  if (!marcaExist) {
    Marca.create(marca)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Um problema ocorreu ao cadastrar.",
        });
      });
  } else {
    res.status(400).send({
      message: `Os dados da Marca ${
        marca.nome ? `${marca.nome}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Marca.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Um problema ocorreu com a busca.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Marca.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar Marca de id: ${id}, talvez não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar a marca id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Marca.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Marca deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar marca de id: ${id},  talvez não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar marca de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Marca.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar marca de id: ${id}`,
      });
    });
};
