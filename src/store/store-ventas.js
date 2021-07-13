import { axiosInstance } from "boot/axios";

const state = {
  get_listado_vehiculo: [],
  get_datos_vehiculo: []
};

const mutations = {
  get_listado_vehiculo(state, payload) {
    state.get_listar_landin = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_datos_vehiculo(state, payload) {
    state.get_datos_vehiculo = payload;
  }
  
};

const actions = {

  // CALLS DE LISTADO DE VENTAS DE VEHICULOS
  async call_listado_vehiculo({ commit }, payload) {
    const response = await axiosInstance.post(`ventas/listado_vehiculo`, payload);
    commit("get_listado_vehiculo", response.data);
  },
  async call_datos_vehiculo({ commit }, payload) {
    const response = await axiosInstance.post(`/ventas/datos_vehiculo`, payload);
    commit("get_datos_vehiculo", response.data);
  }
  
};

// UNA CONSUMIDA LA WS--- VOY AQUI Y LO PINTO
const getters = {
  get_listado_vehiculo(state) {
    return state.get_listado_vehiculo;
  },
  get_datos_vehiculo(state) {
    return state.get_datos_vehiculo;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
