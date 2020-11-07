const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldTombamento = {
  numero: "9999"  
};

const newTombamento = {
  numero: "9999" 
};

let tombamento;

describe("the suite of the integrations test ", () => {
  describe("routes of tombamentos", () => {
    it("create a new number of", (done) => {
      chai
        .request(server)
        .post("/tombamentos")
        .set("content-type", "application/json")
        .send(newTombamento)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          tombamento = res.body;
          done();
        }); 
    });

    it("try to register a exist numero data ", (done) => {
      chai
        .request(server)
        .post("/tombamentos")
        .set("content-type", "application/json")
        .send(oldTombamento)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Get all tombamentos", (done) => {
      chai
        .request(server)
        .get("/tombamentos")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the number", (done) => {
      tombamento.numero = "9998";
      chai
        .request(server)
        .put(`/tombamentos/${tombamento.id}`)
        .send(tombamento)
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
        .get(`/tombamentos/${tombamento.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a tombamento", (done) => {
      chai
        .request(server)
        .delete(`/tombamentos/${tombamento.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
