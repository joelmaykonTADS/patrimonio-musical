const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldInstrumento = {
  nome: "Violino",
  caracteristica: "4/4",
  tombamento: "0001",
  ano: "2020",
  marca: "Parrot",
  observacoes: "observado que ...",
  componentes: "Arco, Case",
  empresa: "Arte Musical",
  notafiscal: "12345676",
  valor: "200,00",
  data: "12/07/2020",
  origem: "Natal-RN",
  observacoesDoacao: "descrição ...",
};

const newInstrumento = {
  nome: "Violino",
  caracteristica: "4/4",
  tombamento: "0001",
  ano: "2020",
  marca: "Parrot",
  observacoes: "observado que ...",
  componentes: "Arco, Case",
  empresa: "Arte Musical",
  notafiscal: "12345676",
  valor: "200,00",
  data: "12/07/2020",
  origem: "Natal-RN",
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
          console.log(res.body);
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
