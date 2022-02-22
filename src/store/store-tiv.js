import { axiosInstance } from "boot/axios";

const state = {
  get_listar_bandeja_general: [],
  get_listar_bandeja_tramite_estado: [],
  get_inform_vehicu_tramite: [],
  dialogDetalle: false
  
};

const mutations = {
  get_listar_bandeja_general(state, payload) {
    state.get_listar_bandeja_general = payload;
  },

  get_inform_vehicu_tramite(state, payload) {
    state.get_inform_vehicu_tramite = payload;
  },

  get_listar_bandeja_tramite_estado(state, payload) {
    state.get_listar_bandeja_tramite_estado = payload;
  },

  dialogDetalle(state, payload) {
    state.dialogDetalle = payload;
  },
  
};

const actions = {
  //LISTA GENERAL DE VEHICULOS QUE SERÁN VENDIDOS
  async call_listar_bandeja_general({ commit }, payload) {
    const response = await axiosInstance.post(`/tiv/bandeja_general`, payload);
    commit("get_listar_bandeja_general", response.data);
  },
  
  //LISTA ESTADO DE VENTA O TRÁMITE
  async call_listar_bandeja_tramite_estado({ commit }, payload) {
    const response = await axiosInstance.post(`/tiv/bandeja_tramite_estado`, payload);
    commit("get_listar_bandeja_tramite_estado", response.data);
  },
  
  //INFORMACIÓN DEL VEHICULO 
  async call_inform_vehicu_tramite({ commit }, payload) {
    const response = await axiosInstance.post(`/tiv/datos_vehiculo`, payload);
    commit("get_inform_vehicu_tramite", response.data);
  },
  
};

const getters = {
  get_listar_bandeja_general(state) {
    return state.get_listar_bandeja_general;
  },
  get_listar_bandeja_tramite_estado(state) {
    return state.get_listar_bandeja_tramite_estado;
  },
  get_inform_vehicu_tramite(state) {
    return state.get_inform_vehicu_tramite;
  }
  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
