const models = require("../models");
const Nome = models.Nome;

exports.create = async (req, res) => {
  const nome = { nome: req.body.nome };
  const nomeExist = await Nome.findOne({
    where: { nome: nome.nome },
  });
  if (!nomeExist) {
    Nome.create(nome)
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
      message: `Os dados do nome ${
        nome.nome ? `${nome.nome}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Nome.findAll()
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

  Nome.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar nome de id: ${id}, talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar o nome id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Nome.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Nome deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar nome de id: ${id},  talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar nome de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Nome.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar nome de id: ${id}`,
      });
    });
};
