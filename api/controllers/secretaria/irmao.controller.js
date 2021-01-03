const models = require("../../models");
const Irmao = models.Irmao;

exports.create = async (req, res) => {
  const irmao = req.body;
  const irmaoExist = await Irmao.findOne({
    where: { codigo: irmao.codigo },
  });
  if (!irmaoExist) {
    Irmao.create(irmao)
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
      message: `Os dados do codigo da irmao ${
        irmao.codigo ? ` ${irmao.codigo}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Irmao.findAll()
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

  Irmao.update(req.body, {
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

  Irmao.destroy({
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

  Irmao.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar ano de id: ${id}`,
      });
    });
};
