const models = require("../../models");
const Empresa = models.Empresa;

exports.create = async (req, res) => {
  const empresa = { nome: req.body.nome };
  const empresaExist = await Empresa.findOne({
    where: { nome: empresa.nome },
  });
  if (!empresaExist) {
    Empresa.create(empresa)
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
      message: `Os dados do empresa ${
        empresa.nome ? ` ${empresa.nome}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Empresa.findAll()
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

  Empresa.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar empresa de id: ${id}, talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar o empresa id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Empresa.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Empresa deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar o empresa de id: ${id},  talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar o empresa de id: ${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Empresa.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar empresa de id: ${id}`,
      });
    });
};
