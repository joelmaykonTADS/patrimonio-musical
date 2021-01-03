import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    instrumento: [],
    igreja: [],
    irmaos:[]
  },
  mutations: {
    setInstrumento(state, instrumento) {
      state.instrumento = instrumento;
    },
    setIgreja(state, igreja) {
      state.igreja = igreja;
    },
    setIrmao(state, irmao) {
      state.irmao = irmao;
    }
  },
  actions: {
    instrumento: (state) => state.instrumento,
    igreja: (state) => state.igreja,
    irmao: (state) => state.irmao
  },
  modules: {},
});
