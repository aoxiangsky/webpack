import Vue from "vue";
import Vuex from "vuex";
import commonState from "./modules/commonState";

import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    commonState,
  },
  getters,
});

export default store;
