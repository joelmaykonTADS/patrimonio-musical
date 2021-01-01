const models = require("../../models");
const Caracteristica = models.Caracteristica;

exports.create = async (req, res) => {
  const caracteristica = { nome: req.body.nome };
  const caracteristicaExist = await Caracteristica.findOne({
    where: { nome: caracteristica.nome },
  });
  if (!caracteristicaExist) {
    Caracteristica.create(caracteristica)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Um problema ocorreu ao cadastrar.",
        });
      });
  } else {
    res.status(400).send({
      message: `Os dados da característica ${
        caracteristica.nome ? `${caracteristica.nome}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Caracteristica.findAll()
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

  Caracteristica.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar característica de id: ${id}, talvez não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar característica id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Caracteristica.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Característica deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar característica de id: ${id},  talvez não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar característica de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Caracteristica.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar característica de id: ${id}`,
      });
    });
};
