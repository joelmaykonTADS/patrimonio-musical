import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    instrumento: [],
    igreja: [],
  },
  mutations: {
    setInstrumento(state, instrumento) {
      state.instrumento = instrumento;
    },
    setIgreja(state, igreja) {
      state.igreja = igreja;
    },
  },
  actions: {
    instrumento: (state) => state.instrumento,
    igreja: (state) => state.igreja,
  },
  modules: {},
});
