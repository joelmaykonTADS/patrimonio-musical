import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";

import Instrumento from "@/components/instrumento/Instrumento.vue";
import VueRouter from "vue-router";
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("Instrumento.vue", () => {
  const instrumento = {
    nome: "Violino",
    caracteristica: "4/4",
    tombamento: "0011",
    ano: "2020",
    marca: "Parrot",
    observacoes: "observado que ...",
    componentes: ["Arco", "Case"],
    empresa: "Arte Musical",
    notafiscal: "12345676",
    valor: "200,00",
    data: "12/07/2020",
    origem: "Natal-RN",
    observacoesDoacao: "descrição ...",
  };
  const readonly = false;
  const type = "register";
  const wrapper = shallowMount(Instrumento, {
    localVue,
    router,
    propsData: { instrumento, readonly, type },
  });
  it("renders props when passed", () => {
    expect(wrapper.vm.$props.instrumento).to.include(instrumento);
    expect(wrapper.vm.$props.readonly).to.equal(false);
    expect(wrapper.vm.$props.type).to.equal("register");
  });
  it("renders data when passed", async () => {
    expect(wrapper.vm.$data.nome).to.equal("Violino");
    expect(wrapper.vm.$data.caracteristica).to.equal("4/4");
    expect(wrapper.vm.$data.tombamento).to.equal("0011");
    expect(wrapper.vm.$data.marca).to.equal("Parrot");
    expect(wrapper.vm.$data.observacoes).to.equal("Observado que ...");
  });
  it("testing function register instrument", async () => {
    const btnSalvar = wrapper.find("#salvar");
    expect(btnSalvar.selector).to.equal("#salvar")
    btnSalvar.trigger("click");
  });  
});



