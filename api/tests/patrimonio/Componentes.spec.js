const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldComponente = {
  nome: "Palheta Teste"  
};

const newComponente = {
  nome: "Palheta Teste" 
};

let componente;

describe("the suite of the integrations test ", () => {
  describe("routes of tombamentos", () => {
    it("create a new number of", (done) => {
      chai
        .request(server)
        .post("/componentes")
        .set("content-type", "application/json")
        .send(newComponente)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          componente = res.body;
          done();
        }); 
    });

    it("try to register a exist nome data ", (done) => {
      chai
        .request(server)
        .post("/componentes")
        .set("content-type", "application/json")
        .send(oldComponente)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Get all tombamentos", (done) => {
      chai
        .request(server)
        .get("/componentes")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the number", (done) => {
      componente.nome = "Boquilha Teste";
      chai
        .request(server)
        .put(`/componentes/${componente.id}`)
        .send(componente)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object"); 
          done();
        });
    });

    it("Get a tombamento", (done) => {
      chai
        .request(server)
        .get(`/componentes/${componente.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a tombamento", (done) => {
      chai
        .request(server)
        .delete(`/componentes/${componente.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
