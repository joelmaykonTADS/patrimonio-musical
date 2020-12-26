import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    instrumento: [],
  },
  mutations: {
    setInstrumento(state, instrumento) {
      state.instrumento = instrumento;
    },
  },
  actions: {
    instrumento: (state) => state.instrumento,
  },
  modules: {},
});
