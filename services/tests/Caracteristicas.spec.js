const chaiHttp = require("chai-http");
const server = require("../app");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const oldCaracteristica = {
  nome: "4/4 Teste"  
};

const newCaracteristica = {
  nome: "4/4 Teste" 
};

let caracteristica;

describe("the suite of the integrations test ", () => {
  describe("routes of nomes", () => {
    it("create a new name", (done) => {
      chai
        .request(server)
        .post("/caracteristicas")
        .set("content-type", "application/json")
        .send(newCaracteristica)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          caracteristica = res.body;
          done();
        }); 
    });

    it("try to register a exist nome data ", (done) => {
      chai
        .request(server)
        .post("/caracteristicas")
        .set("content-type", "application/json")
        .send(oldCaracteristica)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a("object"); 
          done();
        });
    });

    it("Get all names", (done) => {
      chai
        .request(server)
        .get("/caracteristicas")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("Update data the name", (done) => {
      caracteristica.nome = "3/4 Teste";
      chai
        .request(server)
        .put(`/caracteristicas/${caracteristica.id}`)
        .send(caracteristica)
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
        .get(`/caracteristicas/${caracteristica.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("Delete a nome", (done) => {
      chai
        .request(server)
        .delete(`/caracteristicas/${caracteristica.id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
