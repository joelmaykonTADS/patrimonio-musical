const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldNome = {
  nome: "Violino"  
};

const newNome = {
  nome: "violino" 
};

let nome;

describe("the suite of the integrations test ", () => {
  describe("routes of nomes", () => {
    it("create a new name", (done) => {
      chai
        .request(server)
        .post("/nomes")
        .set("content-type", "application/json")
        .send(newNome)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          nome = res.body;
          done();
        }); 
    });

    it("try to register a exist nome data ", (done) => {
      chai
        .request(server)
        .post("/nomes")
        .set("content-type", "application/json")
        .send(oldNome)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Get all names", (done) => {
      chai
        .request(server)
        .get("/nomes")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the name", (done) => {
      nome.nome = "Violino";
      chai
        .request(server)
        .put(`/nomes/${nome.id}`)
        .send(nome)
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
        .get(`/nomes/${nome.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a nome", (done) => {
      chai
        .request(server)
        .delete(`/nomes/${nome.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
