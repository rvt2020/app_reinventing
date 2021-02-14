import { axiosInstance } from "boot/axios";

const state = {
  get_listar_ordcom: [],
  dialogCrear: false,
  dialogDetalleOrden: false,
  get_listar_pendie_visado_jefatura: [],
  get_listar_pendie_visado_gerencia: [],
  get_inform_ordcom: [],
  get_listar_produc_encont: [],
  get_listar_detall_ordcom: [],
  ordenCompra: null,
  get_catalogo_tcprovee: [],
  get_tcservic: [],
  get_catalogo_tcmoneda: [],
  get_catalogo_tcsolici: []
};

const mutations = {
  get_listar_ordcom(state, payload) {
    state.get_listar_ordcom = payload;
  },
  dialogCrear(state, payload) {
    state.dialogCrear = payload;
  },
  dialogDetalleOrden(state, payload) {
    state.dialogDetalleOrden = payload;
  },
  get_listar_pendie_visado_jefatura(state, payload) {
    state.get_listar_pendie_visado_jefatura = payload;
  },
  get_listar_pendie_visado_gerencia(state, payload) {
    state.get_listar_pendie_visado_gerencia = payload;
  },
  get_inform_ordcom(state, payload) {
    state.get_inform_ordcom = payload;
  },
  get_listar_produc_encont(state, payload) {
    state.get_listar_produc_encont = payload;
  },
  get_listar_detall_ordcom(state, payload) {
    state.get_listar_detall_ordcom = payload;
  },
  ordenCompra(state, payload) {
    state.ordenCompra = payload;
  },
  get_catalogo_tcprovee(state, payload) {
    state.get_catalogo_tcprovee = payload;
  },
  get_tcservic(state, payload) {
    state.get_tcservic = payload;
  },
  get_catalogo_tcmoneda(state, payload) {
    state.get_catalogo_tcmoneda = payload;
  },
  get_catalogo_tcsolici(state, payload) {
    state.get_catalogo_tcsolici = payload;
  }
};

const actions = {
  async call_listar_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(`/ordcom/listar_ordcom`, payload);
    commit("get_listar_ordcom", response.data);
  },
  async call_listar_pendie_visado_jefatura({ commit }, payload) {
    const response = await axiosInstance.post(
      `/ordcom/listar_pendie_visado`,
      payload
    );
    commit("get_listar_pendie_visado_jefatura", response.data);
  },
  async call_listar_pendie_visado_gerencia({ commit }, payload) {
    const response = await axiosInstance.post(
      `/ordcom/listar_pendie_visado`,
      payload
    );
    commit("get_listar_pendie_visado_gerencia", response.data);
  },
  async call_inform_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(`/ordcom/inform_ordcom`, payload);
    commit("get_inform_ordcom", response.data);
  },
  async call_listar_produc_encont({ commit }, payload) {
    const response = await axiosInstance.post(
      `/ordcom/listar_produc_encont`,
      payload
    );
    commit("get_listar_produc_encont", response.data);
  },
  async call_listar_detall_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(
      `/ordcom/listar_detall_ordcom`,
      payload
    );
    commit("get_listar_detall_ordcom", response.data);
  },
  async call_insert_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(`/ordcom/insert_ordcom`, payload);
    // commit("get_insert_ordcom", response.data);
    return response.data;
  },
  async call_visrec_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(`/ordcom/visrec_ordcom`, payload);
    // commit("get_visrec_ordcom", response.data);
    return response.data;
  },
  async call_catalogo_tcprovee({ commit }, payload) {
    const response = await axiosInstance.get(
      `/ordcom/catalogo/tcprovee`,
      payload
    );
    commit("get_catalogo_tcprovee", response.data);
  },
  async call_tcservic({ commit }, payload) {
    const response = await axiosInstance.get(`/ordcom/tcservic`);
    commit("get_tcservic", response.data);
  },
  async call_catalogo_tcmoneda({ commit }) {
    const response = await axiosInstance.get(`/ordcom/catalogo/tcmoneda`);
    commit("get_catalogo_tcmoneda", response.data);
  },
  async call_update_ordcom({ commit }, payload) {
    const response = await axiosInstance.get(`/ordcom/update_ordcom`);
    return response.data;
    // commit("get_update_ordcom", response.data);
  },
  async call_manten_produc_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(
      `/ordcom/manten_produc_ordcom`,
      payload
    );
    return response.data;
    // commit("get_update_ordcom", response.data);
  },
  async call_catalogo_tcsolici({ commit }, payload) {
    const response = await axiosInstance.get(
      `/ordcom/catalogo/tcsolici`,
      payload
    );
    // return response.data;
    commit("get_catalogo_tcsolici", response.data);
  },
  async call_delete_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(`/ordcom/delete_ordcom`, payload);
    return response.data;
    // commit("get_update_tradoc", response.data);
  },
  async call_insert_arcadj({ commit }, payload) {
    const response = await axiosInstance.post(`/ordcom/insert_arcadj`, payload);
    return response.data;
    // commit("get_update_tradoc", response.data);
  },
  async call_listar_arcadj_ordcom({ commit }, payload) {
    const response = await axiosInstance.post(
      `/ordcom/listar_arcadj_ordcom`,
      payload
    );
    return response.data;
    // commit("get_listar_arcadj_ordcom", response.data);
  }
};

const getters = {
  get_listar_ordcom(state) {
    return state.get_listar_ordcom;
  },
  get_listar_pendie_visado_jefatura(state) {
    return state.get_listar_pendie_visado_jefatura;
  },
  get_listar_pendie_visado_gerencia(state) {
    return state.get_listar_pendie_visado_gerencia;
  },
  get_inform_ordcom(state) {
    return state.get_inform_ordcom;
  },
  get_listar_produc_encont(state) {
    return state.get_listar_produc_encont;
  },
  get_listar_detall_ordcom(state) {
    return state.get_listar_detall_ordcom;
  },
  get_catalogo_tcprovee(state) {
    return state.get_catalogo_tcprovee;
  },
  get_tcservic(state) {
    return state.get_tcservic;
  },
  get_catalogo_tcmoneda(state) {
    return state.get_catalogo_tcmoneda;
  },
  get_catalogo_tcsolici(state) {
    return state.get_catalogo_tcsolici;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
