import { axiosInstance } from "boot/axios";

const state = {
  get_listar_tradoc: [],
  dialogCrear: false,
  dialogDetalleOrden: false,
  get_listar_pendie_visado_jefatura: [],
  get_listar_pendie_visado_gerencia: [],
  get_inform_tradoc: [],
  get_listar_produc_encont: [],
  get_listar_detall_tradoc: [],
  tramiteDoc: null,
  get_catalogo_tcprovee: [],
  get_catalogo_tctipdoc: [],
  get_catalogo_tcmoneda: [],
  get_catalogo_tcsolici: []
};

const mutations = {
  get_listar_tradoc(state, payload) {
    state.get_listar_tradoc = payload;
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
  get_inform_tradoc(state, payload) {
    state.get_inform_tradoc = payload;
  },
  get_listar_produc_encont(state, payload) {
    state.get_listar_produc_encont = payload;
  },
  get_listar_detall_tradoc(state, payload) {
    state.get_listar_detall_tradoc = payload;
  },
  tramiteDoc(state, payload) {
    state.tramiteDoc = payload;
  },
  get_catalogo_tcprovee(state, payload) {
    state.get_catalogo_tcprovee = payload;
  },
  get_catalogo_tctipdoc(state, payload) {
    state.get_catalogo_tctipdoc = payload;
  },
  get_catalogo_tcmoneda(state, payload) {
    state.get_catalogo_tcmoneda = payload;
  },
  get_catalogo_tcsolici(state, payload) {
    state.get_catalogo_tcsolici = payload;
  }
};

const actions = {
  async call_listar_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(`tradoc/listar_tradoc`, payload);
    commit("get_listar_tradoc", response.data);
  },
  async call_listar_pendie_visado_jefatura({ commit }, payload) {
    const response = await axiosInstance.post(
      `/tradoc/listar_pendie_visado`,
      payload
    );
    commit("get_listar_pendie_visado_jefatura", response.data);
  },
  async call_listar_pendie_visado_gerencia({ commit }, payload) {
    const response = await axiosInstance.post(
      `/tradoc/listar_pendie_visado`,
      payload
    );
    commit("get_listar_pendie_visado_gerencia", response.data);
  },
  async call_inform_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(`/tradoc/inform_tradoc`, payload);
    commit("get_inform_tradoc", response.data);
  },
  async call_listar_produc_encont({ commit }, payload) {
    const response = await axiosInstance.post(
      `/tradoc/listar_produc_encont`,
      payload
    );
    commit("get_listar_produc_encont", response.data);
  },
  async call_listar_detall_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(
      `/tradoc/listar_detall_tradoc`,
      payload
    );
    commit("get_listar_detall_tradoc", response.data);
  },
  async call_insert_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(`/tradoc/insert_tradoc`, payload);
    // commit("get_insert_tradoc", response.data);
    return response.data;
  },
  async call_visrec_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(`/tradoc/visrec_tradoc`, payload);
    // commit("get_visrec_tradoc", response.data);
    return response.data;
  },
  async call_catalogo_tcprovee({ commit }, payload) {
    const response = await axiosInstance.get(
      `/tradoc/catalogo/tcprovee`,
      payload
    );
    commit("get_catalogo_tcprovee", response.data);
  },
  async call_tcservic({ commit }, payload) {
    const response = await axiosInstance.get(`/tradoc/tcservic`);
    commit("get_tcservic", response.data);
  },
  async call_catalogo_tcmoneda({ commit }) {
    const response = await axiosInstance.get(`/tradoc/catalogo/tcmoneda`);
    commit("get_catalogo_tcmoneda", response.data);
  },
  async call_catalogo_tctipdoc({ commit }) {
    const response = await axiosInstance.get(`/tradoc/catalogo/tctipdoc`);
    commit("get_catalogo_tctipdoc", response.data);
  },
  async call_catalogo_tcsolici({ commit }) {
    const response = await axiosInstance.get(`/tradoc/catalogo/tcsolici`);
    commit("get_catalogo_tcsolici", response.data);
  },
  async call_update_tradoc({ commit }, payload) {
    const response = await axiosInstance.get(`/tradoc/update_tradoc`);
    return response.data;
    // commit("get_update_tradoc", response.data);
  },
  async call_manten_produc_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(
      `/tradoc/manten_produc_tradoc`,
      payload
    );
    return response.data;
    // commit("get_update_tradoc", response.data);
  },
  async call_delete_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(`/tradoc/delete_tradoc`, payload);
    return response.data;
    // commit("get_update_tradoc", response.data);
  },
  async call_insert_arcadj({ commit }, payload) {
    const response = await axiosInstance.post(`/tradoc/insert_arcadj`, payload);
    return response.data;
    // commit("get_update_tradoc", response.data);
  },
  async call_listar_arcadj_tradoc({ commit }, payload) {
    const response = await axiosInstance.post(
      `/tradoc/listar_arcadj_tradoc`,
      payload
    );
    return response.data;
    // commit("get_listar_arcadj_tradoc", response.data);
  }
};

const getters = {
  get_listar_tradoc(state) {
    return state.get_listar_tradoc;
  },
  get_listar_pendie_visado_jefatura(state) {
    return state.get_listar_pendie_visado_jefatura;
  },
  get_listar_pendie_visado_gerencia(state) {
    return state.get_listar_pendie_visado_gerencia;
  },
  get_inform_tradoc(state) {
    return state.get_inform_tradoc;
  },
  get_listar_produc_encont(state) {
    return state.get_listar_produc_encont;
  },
  get_listar_detall_tradoc(state) {
    return state.get_listar_detall_tradoc;
  },
  get_catalogo_tcprovee(state) {
    return state.get_catalogo_tcprovee;
  },
  get_catalogo_tctipdoc(state) {
    return state.get_catalogo_tctipdoc;
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
