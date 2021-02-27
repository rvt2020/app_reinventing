import { axiosInstance } from "boot/axios";

const state = {
  get_listar_llamad: []
};

const mutations = {
  get_listar_llamad(state, payload) {
    state.get_listar_llamad = payload; // payload : información o data  luego se va al state (arriba)
  }
};

const actions = {

  // CALLS DE LANDINS PRINCIPAL
  async call_listar_llamad({ commit }, payload) {
    const response = await axiosInstance.post(`llamad/listar_llamad`, payload);
    commit("get_listar_llamad", response.data);
  }
  
};

// UNA CONSUMIDA LA WS--- VOY AQUI Y LO PINTO
const getters = {
  get_listar_llamad(state) {
    return state.get_listar_llamad;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
