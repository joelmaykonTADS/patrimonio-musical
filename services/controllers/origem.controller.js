const models = require("../models");
const Origem = models.Origem;

exports.create = async (req, res) => {
  const origem = { nome: req.body.nome };
  const origemExist = await Origem.findOne({
    where: { nome: origem.nome },
  });
  if (!origemExist) {
    Origem.create(origem)
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
      message: `Os dados do origem ${
        origem.nome ? ` ${origem.nome}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Origem.findAll()
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

  Origem.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar origem de id: ${id}, talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar o origem id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Origem.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Origem deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar o origem de id: ${id},  talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar o origem de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Origem.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar origem de id: ${id}`,
      });
    });
};
