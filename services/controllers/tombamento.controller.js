const models = require("../models");
const { Op } = require("sequelize");

const Tombamento = models.Tombamento;
const Instrumento = models.Instrumento;

exports.create = async (req, res) => {
  const tombamento = { numero: req.body.numero };
  const tombamentoExist = await Tombamento.findOne({
    where: { numero: tombamento.numero },
  });
  if (!tombamentoExist) {
    Tombamento.create(tombamento)
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
      message: `Os dados do tombamento ${tombamento.numero ? `numero: ${tombamento.numero}` : ``
        } já existe.`,
    });
  }
};


exports.findAll = (_, res) => {
  Instrumento.findAll()
    .then((instrumentos) => {
      let tombamentos = [];
      instrumentos.forEach(instrumento => {
        if (instrumento) {
          tombamentos.push(instrumento.tombamento);
        }
      })
      Tombamento.findAll({ where: { numero: { [Op.notIn]: tombamentos } } }).then((data) => {
        res.status(200).send(data);
      })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Um problema ocorreu ao salvar.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Um problema ocorreu ao salvar.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tombamento.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar tombamento de id: ${id}, talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar o tombamento id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tombamento.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tombamento deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar o tombamento de id: ${id},  talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar o tombamento de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tombamento.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar tombamento de id: ${id}`,
      });
    });
};
