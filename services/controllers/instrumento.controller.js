const models = require("../models");
const Instrumento = models.Instrumento;
const Nome = models.Nome;
const Caracteristica = models.Caracteristica;
const Tombamento = models.Tombamento;
const Ano = models.Ano;
const Marca = models.Marca;
const Empresa = models.Empresa;
const Origem = models.Origem;
const Componente = models.Componente;

exports.create = async (req, res) => {
  const instrumento = {
    nome: req.body.instrumento.nome,
    tombamento: req.body.instrumento.tombamento,
    caracteristica: req.body.instrumento.caracteristica,
    aquisicao: req.body.instrumento.aquisicao,
    marca: req.body.instrumento.marca,
    naipe: req.body.instrumento.naipe,
    ano: req.body.instrumento.ano,
    descricao: req.body.instrumento.descricao,
    empresa: req.body.instrumento.empresa,
    origemDoacao: req.body.instrumento.origemDoacao,
    observacoes: req.body.instrumento.observacoes,
    componentes: req.body.instrumento.componentes.join(),
    notaFiscal: req.body.instrumento.notaFiscal,
    valor: req.body.instrumento.valor,
    data: req.body.instrumento.data,
    observacoesDoacao: req.body.instrumento.observacoesDoacao
  };

  if (req.body.saveItem === "sim") {
    const list = [
      { model: Nome, field: { nome: instrumento.nome } },
      { model: Caracteristica, field: { nome: instrumento.caracteristica } },
      { model: Tombamento, field: { numero: instrumento.tombamento } },
      { model: Ano, field: { numero: instrumento.ano } },
      { model: Empresa, field: { nome: instrumento.empresa } },
      { model: Marca, field: { nome: instrumento.marca } },
      { model: Origem, field: { nome: instrumento.origem } }
    ]
    list.forEach(async element => {
      const { model, field } = element;
      const exist = await model.findOne({
        where: { ...field },
      });
      if (!exist) {
        model.create({ ...field })
      }
    });
    req.body.instrumento.componentes.forEach(async element => {
      const componente = await Componente.findOne({
        where: { nome: element },
      });
      if (!componente) {
        Componente.create({ nome: element })
      }
    })
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
      message: `Os dados do instrumento ${instrumento.tombamento ? `tombamento: ${instrumento.tombamento}` : ``
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
