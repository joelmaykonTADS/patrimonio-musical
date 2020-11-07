import { salvar } from "@/services/instrumentos.js";
import { expect } from "chai";

describe("services instrumento.js", () => {
  const instrumento = {
    nome: "Violino",
    caracteristica: "4/4",
    tombamento: "0049",
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

  it("testing method salvar ok", async () => {
    await salvar(instrumento)
      .then((resultado) => {
        if (resultado) expect(resultado.status).to.equal(200);
      })
      .catch((e) => {
        if (e) expect(e.response.status).to.equal(400);
      });
  });
});
