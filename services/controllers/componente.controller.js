const models = require("../models");
const Componente = models.Componente;

exports.create = async (req, res) => {
  const componente = { nome: req.body.nome };
  const componenteExist = await Componente.findOne({
    where: { nome: componente.nome },
  });
  if (!componenteExist) {
    Componente.create(componente)
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
      message: `Os dados do componente ${
        componente.nome ? ` ${componente.nome}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Componente.findAll()
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

  Componente.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar componente de id: ${id}, talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar o componente id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Componente.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Componente deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar o componente de id: ${id},  talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar o componente de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Componente.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar componente de id: ${id}`,
      });
    });
};
