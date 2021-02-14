import { axiosInstance } from "boot/axios";

const state = {
  get_listar_produc_ordtra_ingres: [],
  dialogIngresoOC: false,
  dialogIngresoTD: false,
  dialogCrear: false,
  dialogDetalleOrden: false,
  get_combo_almacen: [],
  get_rep_kardex: [],
  get_rep_invent_valori: [],
  get_listar_produc_encont: [],
  get_listar_detall_ordcom: [],
  ordenCompra: null,
  get_catalogo_tcprovee: [],
  get_tcservic: [],
  get_catalogo_tcmoneda: [],
  get_insert_produc_ingsal: [],
  get_listar_produc_agrega_ingsal: [],
  get_listar_docume_agrega_ingsal: [],
  get_listar_produc_operac_salida: [],
  dialogSalidaOP: false
};

const mutations = {
  get_listar_produc_ordtra_ingres(state, payload) {
    state.get_listar_produc_ordtra_ingres = payload;
  },
  dialogIngresoOC(state, payload) {
    state.dialogIngresoOC = payload;
  },
  dialogIngresoTD(state, payload) {
    state.dialogIngresoTD = payload;
  },
  get_insert_produc_ingsal(state, payload) {
    state.get_insert_produc_ingsal = payload;
  },
  get_listar_docume_agrega_ingsal(state, payload) {
    state.get_listar_docume_agrega_ingsal = payload;
  },
  get_listar_produc_agrega_ingsal(state, payload) {
    state.get_listar_produc_agrega_ingsal = payload;
  },
  get_listar_produc_operac_salida(state, payload) {
    state.get_listar_produc_operac_salida = payload;
  },
  dialogSalidaOP(state, payload) {
    state.dialogSalidaOP = payload;
  }
};

const actions = {
  async call_listar_produc_ordtra_ingres({ commit }, payload) {
    const response = await axiosInstance.post(
      `/almace/listar_produc_ordtra_ingres`,
      payload
    );
    commit("get_listar_produc_ordtra_ingres", response.data);
  },
  async call_insert_produc_ingsal({ commit }, payload) {
    const response = await axiosInstance.post(
      `/almace/insert_produc_ingsal`,
      payload
    );
    commit("get_insert_produc_ingsal", response.data);
  },
  async call_listar_docume_agrega_ingsal({ commit }, payload) {
    const response = await axiosInstance.post(
      `/almace/listar_docume_agrega_ingsal`,
      payload
    );
    commit("get_listar_docume_agrega_ingsal", response.data);
  },
  async call_quitar_produc_agrega_ingsal({ commit }, payload) {
    const response = await axiosInstance.post(
      `/almace/quitar_produc_agrega_ingsal`,
      payload
    );
    return response.data;
  },
  async call_grabar_transa_ingsal({ commit }, payload) {
    const response = await axiosInstance.post(
      `/almace/grabar_transa_ingsal`,
      payload
    );
    return response.data;
  },
  async call_listar_produc_agrega_ingsal({ commit }, payload) {
    const response = await axiosInstance.post(
      `/almace/listar_produc_agrega_ingsal`,
      payload
    );
    commit("get_listar_produc_agrega_ingsal", response.data);
  },
  async call_listar_produc_operac_salida({ commit }, payload) {
    const response = await axiosInstance.post(
      `/almace/listar_produc_operac_salida`,
      payload
    );
    commit("get_listar_produc_operac_salida", response.data);
  }
};

const getters = {
  get_listar_produc_ordtra_ingres(state) {
    return state.get_listar_produc_ordtra_ingres;
  },
  get_insert_produc_ingsal(state) {
    return state.get_insert_produc_ingsal;
  },
  get_listar_produc_agrega_ingsal(state) {
    return state.get_listar_produc_agrega_ingsal;
  },
  get_listar_docume_agrega_ingsal(state) {
    return state.get_listar_docume_agrega_ingsal;
  },
  get_listar_produc_operac_salida(state) {
    return state.get_listar_produc_operac_salida;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
