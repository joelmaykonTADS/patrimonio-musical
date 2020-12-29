const models = require("../../models/secretaria");
const Igreja = models.Igreja;

exports.create = async (req, res) => {
  const igreja = req.body;
  const igrejaExist = await Igreja.findOne({
    where: { codigo: igreja.codigo },
  });
  if (!igrejaExist) {
    Igreja.create(igreja)
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
      message: `Os dados do codigo da igreja ${
        igreja.codigo ? ` ${igreja.codigo}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Igreja.findAll()
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

  Igreja.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar ano de id: ${id}, talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar o ano id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Igreja.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(204);
        res.send({
          message: "Ano deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar o ano de id: ${id},  talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar o ano de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Igreja.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar ano de id: ${id}`,
      });
    });
};
