import { axiosInstance } from "boot/axios";

const state = {
  get_listar_vehicu: [],
  dialogOperacion: false,
  get_inform_vehicu: [],
  documentoVenta: null
};

const mutations = {
  get_listar_vehicu(state, payload) {
    state.get_listar_vehicu = payload;
  },
  dialogOperacion(state, payload) {
    state.dialogOperacion = payload;
  },
  get_inform_vehicu(state, payload) {
    state.get_inform_vehicu = payload;
  },
  documentoVenta(state, payload) {
    state.documentoVenta = payload;
  }
};

const actions = {
  async call_listar_vehicu({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/listado_vehiculo`, payload);
    commit("get_listar_vehicu", response.data);
  },
  async call_inform_vehicu({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/datos_vehiculo`, payload);
    commit("get_inform_vehicu", response.data);
  }
};

const getters = {
  get_listar_vehicu(state) {
    return state.get_listar_vehicu;
  },
  get_inform_vehicu(state) {
    return state.get_inform_vehicu;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
