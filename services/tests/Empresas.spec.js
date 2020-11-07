const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldEmpresa = {
  nome: "Musical Teste"  
};

const newEmpresa = {
  nome: "Musical Teste" 
};

let empresa;

describe("the suite of the integrations test ", () => {
  describe("routes of tombamentos", () => {
    it("create a new number of", (done) => {
      chai
        .request(server)
        .post("/empresas")
        .set("content-type", "application/json")
        .send(newEmpresa)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          empresa = res.body;
          done();
        }); 
    });

    it("try to register a exist nome data ", (done) => {
      chai
        .request(server)
        .post("/empresas")
        .set("content-type", "application/json")
        .send(oldEmpresa)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Get all tombamentos", (done) => {
      chai
        .request(server)
        .get("/empresas")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the number", (done) => {
      empresa.nome = "Arte Teste";
      chai
        .request(server)
        .put(`/empresas/${empresa.id}`)
        .send(empresa)
        .then((res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.an("object"); 
          done();
        });
    });

    it("Get a tombamento", (done) => {
      chai
        .request(server)
        .get(`/empresas/${empresa.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a tombamento", (done) => {
      chai
        .request(server)
        .delete(`/empresas/${empresa.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
