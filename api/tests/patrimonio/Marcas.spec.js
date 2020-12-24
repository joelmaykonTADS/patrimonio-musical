const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldMarca = {
  nome: "WerilTeste"  
};

const newMarca = {
  nome: "WerilTeste" 
};

let marca;

describe("the suite of the integrations test ", () => {
  describe("Rotas marcas", () => {
    it("Cadastrar marca", (done) => {
      chai
        .request(server)
        .post("/marcas")
        .set("content-type", "application/json")
        .send(newMarca)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          marca = res.body;
          done();
        }); 
    });

    it("Tentar cadastrar uma marca que já existe ", (done) => {
      chai
        .request(server)
        .post("/marcas")
        .set("content-type", "application/json")
        .send(oldMarca)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Todas as marcas", (done) => {
      chai
        .request(server)
        .get("/marcas")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Atualizar marca", (done) => {
      marca.nome = "MichellTeste";
      chai
        .request(server)
        .put(`/marcas/${marca.id}`)
        .send(marca)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object"); 
          done();
        });
    });

    it("Buscar uma marca", (done) => {
      chai
        .request(server)
        .get(`/marcas/${marca.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Deletar marca", (done) => {
      chai
        .request(server)
        .delete(`/marcas/${marca.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
