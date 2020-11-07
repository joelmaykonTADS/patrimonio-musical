const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldOrigem = {
  nome: "Natal - RN Teste"  
};

const newOrigem = {
  nome: "Natal - RN Teste" 
};

let origem;

describe("the suite of the integrations test ", () => {
  describe("routes of tombamentos", () => {
    it("create a new number of", (done) => {
      chai
        .request(server)
        .post("/origens")
        .set("content-type", "application/json")
        .send(newOrigem)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          origem = res.body;
          done();
        }); 
    });

    it("try to register a exist nome data ", (done) => {
      chai
        .request(server)
        .post("/origens")
        .set("content-type", "application/json")
        .send(oldOrigem)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Get all tombamentos", (done) => {
      chai
        .request(server)
        .get("/origens")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the number", (done) => {
      origem.nome = "Arte Teste";
      chai
        .request(server)
        .put(`/origens/${origem.id}`)
        .send(origem)
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
        .get(`/origens/${origem.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a tombamento", (done) => {
      chai
        .request(server)
        .delete(`/origens/${origem.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
