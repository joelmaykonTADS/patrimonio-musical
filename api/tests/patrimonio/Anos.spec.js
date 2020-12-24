const chaiHttp = require("chai-http");
const server = require("../../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldAno = {
  numero: "2099"  
};

const newAno = {
  numero: "2099" 
};

let ano;

describe("the suite of the integrations test ", () => {
  describe("routes of tombamentos", () => {
    it("create a new number of", (done) => {
      chai
        .request(server)
        .post("/anos")
        .set("content-type", "application/json")
        .send(newAno)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          ano = res.body;
          done();
        }); 
    });

    it("try to register a exist numero data ", (done) => {
      chai
        .request(server)
        .post("/anos")
        .set("content-type", "application/json")
        .send(oldAno)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Get all tombamentos", (done) => {
      chai
        .request(server)
        .get("/anos")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the number", (done) => {
      ano.numero = "2021 Teste";
      chai
        .request(server)
        .put(`/anos/${ano.id}`)
        .send(ano)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object"); 
          done();
        });
    });

    it("Get a tombamento", (done) => {
      chai
        .request(server)
        .get(`/anos/${ano.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a tombamento", (done) => {
      chai
        .request(server)
        .delete(`/anos/${ano.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
