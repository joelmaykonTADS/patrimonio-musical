const models = require("../models");
const Instrumento = models.Instrumento;
const Nome = models.Nome;
const Caracteristica = models.Caracteristica;
const Tombamento = models.Tombamento;
const Ano = models.Ano;
const Marca = models.Marca;

exports.create = async (req, res) => {
  const instrumento = {
    nome: req.body.nome,
    tombamento: req.body.tombamento,
    caracteristica: req.body.caracteristica,
    aquisicao: req.body.aquisicao,
    marca: req.body.marca,
    naipe: req.body.naipe,
    ano: req.body.ano,
    descricao: req.body.descricao,
  };
  const nomeExist = await Nome.findOne({
    where: { nome: instrumento.nome },
  });
  if (!nomeExist) {
    Nome.create({ nome: instrumento.nome })     
  }

  const caracteristicaExist = await Caracteristica.findOne({
    where: { nome: instrumento.caracteristica },
  });
  if (!caracteristicaExist) {
    Caracteristica.create({ nome: instrumento.caracteristica })      
  }

  const tombamentoExist = await Tombamento.findOne({
    where: { numero: instrumento.tombamento },
  });
  if (!tombamentoExist) {
    Tombamento.create({ numero: instrumento.tombamento })     
  }

  const anoExist = await Ano.findOne({
    where: { numero: instrumento.ano },
  });
  if (!anoExist) {
    Ano.create({ numero: instrumento.ano })      
  }

  const marcaExist = await Marca.findOne({
    where: { nome: instrumento.marca },
  });
  if (!marcaExist) {
    Marca.create({ nome: instrumento.nome })     
  }

  const instrumentoExist = await Instrumento.findOne({
    where: { tombamento: instrumento.tombamento },
  });

  if (!instrumentoExist) {
    // Save instrument in the database
    Instrumento.create(instrumento)
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
      message: `Os dados do instrumento ${
        instrumento.tombamento ? `tombamento: ${instrumento.tombamento}` : ``
      } já existe.`,
    });
  }
};

exports.findAll = (_, res) => {
  Instrumento.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Um problema ocorreu ao buscar.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Instrumento.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi posível atualizar com id: ${id}. talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao atualizar o intrumento id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Instrumento.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instrumento deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar instrumento de id: ${id}. talvez não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Um problema ocorreu ao deletar instrumento de id: ${id}.`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Instrumento.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Um problema ocorreu ao buscar instrumento de id: ${id}`,
      });
    });
};
