import { axiosInstance } from "boot/axios";

const state = {
  get_listar_factur: [],
  dialogCrear: false,
  dialogDetalleOrden: false,
  get_inform_factur: [],
  get_listar_operac_encont: [],
  get_listar_detall_factur: [],
  documentoVenta: null,
  get_catalogo_tcclient: [],
  get_catalogo_tctipdoc: []
};

const mutations = {
  get_listar_factur(state, payload) {
    state.get_listar_factur = payload;
  },
  dialogCrear(state, payload) {
    state.dialogCrear = payload;
  },
  dialogDetalleOrden(state, payload) {
    state.dialogDetalleOrden = payload;
  },
  get_inform_factur(state, payload) {
    state.get_inform_factur = payload;
  },
  get_listar_operac_encont(state, payload) {
    state.get_listar_operac_encont = payload;
  },
  get_listar_detall_factur(state, payload) {
    state.get_listar_detall_factur = payload;
  },
  documentoVenta(state, payload) {
    state.documentoVenta = payload;
  },
  get_catalogo_tcclient(state, payload) {
    state.get_catalogo_tcclient = payload;
  },
  get_catalogo_tctipdoc(state, payload) {
    state.get_catalogo_tctipdoc = payload;
  }
};

const actions = {
  async call_listar_factur({ commit }, payload) {
    const response = await axiosInstance.post(`/factur/listar_factur`, payload);
    commit("get_listar_factur", response.data);
  },
  async call_inform_factur({ commit }, payload) {
    const response = await axiosInstance.post(`/factur/inform_factur`, payload);
    commit("get_inform_factur", response.data);
  },
  async call_listar_operac_encont({ commit }, payload) {
    const response = await axiosInstance.post(
      `/factur/listar_operac_encont`,
      payload
    );
    commit("get_listar_operac_encont", response.data);
  },
  async call_listar_detall_factur({ commit }, payload) {
    const response = await axiosInstance.post(
      `/factur/listar_detall_factur`,
      payload
    );
    commit("get_listar_detall_factur", response.data);
  },
  async call_insert_factur({ commit }, payload) {
    const response = await axiosInstance.post(`/factur/insert_factur`, payload);
    // commit("get_insert_ordcom", response.data);
    return response.data;
  },
  async call_delete_detalle_factur({ commit }, payload) {
    const response = await axiosInstance.post(`/factur/delete_detalle_factur`, payload);
    // commit("get_insert_ordcom", response.data);
    return response.data;
  },
  async call_catalogo_tcclient({ commit }, payload) {
    const response = await axiosInstance.get(
      `/factur/catalogo/tcclient`,
      payload
    );
    commit("get_catalogo_tcclient", response.data);
  },
  async call_catalogo_tipdoc({ commit }) {
    const response = await axiosInstance.get(`/factur/catalogo/tctipdoc`);
    commit("get_catalogo_tctipdoc", response.data);
  },
  async call_update_factur({ commit }, payload) {
    const response = await axiosInstance.get(`/factur/update_factur`);
    return response.data;
    // commit("get_update_ordcom", response.data);
  },
  async call_manten_produc_factur({ commit }, payload) {
    const response = await axiosInstance.post(
      `/factur/manten_detalle_factur`,
      payload
    );
    return response.data;
    // commit("get_update_ordcom", response.data);
  },
  async call_delete_factur({ commit }, payload) {
    const response = await axiosInstance.post(`/factur/delete_factur`, payload);
    return response.data;
    // commit("get_update_tradoc", response.data);
  }
};

const getters = {
  get_listar_factur(state) {
    return state.get_listar_factur;
  },
  get_inform_factur(state) {
    return state.get_inform_factur;
  },
  get_listar_operac_encont(state) {
    return state.get_listar_operac_encont;
  },
  get_listar_detall_factur(state) {
    return state.get_listar_detall_factur;
  },
  get_catalogo_tcclient(state) {
    return state.get_catalogo_tcclient;
  },
  get_catalogo_tctipdoc(state) {
    return state.get_catalogo_tctipdoc;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
