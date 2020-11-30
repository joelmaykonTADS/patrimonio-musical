const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldInstrumento = {
  nome: nome,
  caracteristica: "4/4Teste",
  tombamento: "9998",
  ano: "2099",
  marca: "ParrotTeste",
  observacoes: "observado que ...",
  componentes: "ArcoTeste, CaseTeste",
  empresa: "Arte MusicalTeste",
  notafiscal: "12345676",
  valor: "000,00",
  data: "12/07/2099",
  origem: "Natal-RNTeste",
  observacoesDoacao: "descrição ...",
};

const newInstrumento = {
  nome: nome,
  caracteristica: "4/4Teste",
  tombamento: "9998",
  ano: "2099",
  marca: "ParrotTeste",
  observacoes: "observado que ...",
  componentes: "ArcoTeste, CaseTeste",
  empresa: "Arte MusicalTeste",
  notafiscal: "12345676",
  valor: "000,00",
  data: "12/07/2099",
  origem: "Natal-RNTeste",
  observacoesDoacao: "descrição ...",
};

let instrumento;

describe("the suite of the integrations test ", () => {
  describe("routes of instrumentos", () => {
    it("create a new instrument", (done) => {
      chai
        .request(server)
        .post("/instrumentos")
        .set("content-type", "application/json")
        .send(newInstrumento)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          instrumento = res.body;
          done();
        });
    });

    it("try to register a exist student data ", (done) => {
      chai
        .request(server)
        .post("/instrumentos")
        .set("content-type", "application/json")
        .send(oldInstrumento)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Get all instruments", (done) => {
      chai
        .request(server)
        .get("/instrumentos")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the instrumento", (done) => {
      instrumento.observacoes = "Instrumento quebrado";
      chai
        .request(server)
        .put(`/instrumentos/${instrumento.id}`)
        .send(instrumento)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Get a instrumento", (done) => {
      chai
        .request(server)
        .get(`/instrumentos/${instrumento.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a instrument", (done) => {
      chai
        .request(server)
        .delete(`/instrumentos/${instrumento.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
