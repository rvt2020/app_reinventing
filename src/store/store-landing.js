import { axiosInstance } from "boot/axios";

const state = {
  get_listar_landin: [],
  get_tctiplan: [],
  get_tcestlla: [],
  get_tcestdoc: [],
  get_tcexpsis: [],
  get_tcvalcvr: [],
  get_tcrescvr: [],
  get_tcresges: [],
  get_tcresult: [],
  dialogCrear: false,
  get_listar_bitaco: [],
  get_report_gestio: []
};

const mutations = {
  get_listar_landin(state, payload) {
    state.get_listar_landin = payload;
  },
  get_tctiplan(state, payload) {
    state.get_tctiplan = payload;
  },
  get_tcestlla(state, payload) {
    state.get_tcestlla = payload;
  },
  get_tcestdoc(state, payload) {
    state.get_tcestdoc = payload;
  },
  get_tcexpsis(state, payload) {
    state.get_tcexpsis = payload;
  },
  get_tcvalcvr(state, payload) {
    state.get_tcvalcvr = payload;
  },
  get_tcrescvr(state, payload) {
    state.get_tcrescvr = payload;
  },
  get_tcresges(state, payload) {
    state.get_tcresges = payload;
  },
  get_tcresult(state, payload) {
    state.get_tcresult = payload;
  },
  get_listar_bitaco(state, payload) {
    state.get_listar_bitaco = payload;
  },
  get_report_gestio(state, payload) {
    state.get_report_gestio = payload;
  }
};

const actions = {
  async call_listar_landin({ commit }, payload) {
    const response = await axiosInstance.post(`comerc/listar_landin`, payload);
    commit("get_listar_landin", response.data);
  },
  async call_insert_bitges({ commit }, payload) {
    const response = await axiosInstance.post(`comerc/insert_bitges`, payload);
    return response.data;
  },
  async call_tctiplan({ commit }) {
    const response = await axiosInstance.get(`comerc/tctiplan`);
    commit("get_tctiplan", response.data);
  },
  async call_tcestlla({ commit }) {
    const response = await axiosInstance.get(`comerc/tcestlla`);
    commit("get_tcestlla", response.data);
  },
  async call_tcestdoc({ commit }) {
    const response = await axiosInstance.get(`comerc/tcestdoc`);
    commit("get_tcestdoc", response.data);
  },
  async call_tcexpsis({ commit }) {
    const response = await axiosInstance.get(`comerc/tcexpsis`);
    commit("get_tcexpsis", response.data);
  },
  async call_tcvalcvr({ commit }) {
    const response = await axiosInstance.get(`comerc/tcvalcvr`);
    commit("get_tcvalcvr", response.data);
  },
  async call_tcrescvr({ commit }) {
    const response = await axiosInstance.get(`comerc/tcrescvr`);
    commit("get_tcrescvr", response.data);
  },
  async call_tcresges({ commit }) {
    const response = await axiosInstance.get(`comerc/tcresges`);
    commit("get_tcresges", response.data);
  },
  async call_tcresult({ commit }) {
    const response = await axiosInstance.get(`comerc/tcresult`);
    commit("get_tcresult", response.data);
  },
  async call_listar_bitaco({ commit }, payload) {
    const response = await axiosInstance.post(`comerc/listar_bitaco`, payload);
    commit("get_listar_bitaco", response.data);
  },
  async call_report_gestio({ commit }, payload) {
    const response = await axiosInstance.post(`comerc/report_gestio`, payload);
    commit("get_report_gestio", response.data);
  }
};

const getters = {
  get_listar_landin(state) {
    return state.get_listar_landin;
  },
  get_tctiplan(state) {
    return state.get_tctiplan;
  },
  get_tcestlla(state) {
    return state.get_tcestlla;
  },
  get_tcestdoc(state) {
    return state.get_tcestdoc;
  },
  get_tcexpsis(state) {
    return state.get_tcexpsis;
  },
  get_tcvalcvr(state) {
    return state.get_tcvalcvr;
  },
  get_tcrescvr(state) {
    return state.get_tcrescvr;
  },
  get_tcresges(state) {
    return state.get_tcresges;
  },
  get_tcresult(state) {
    return state.get_tcresult;
  },
  get_listar_bitaco(state) {
    return state.get_listar_bitaco;
  },
  get_report_gestio(state) {
    return state.get_report_gestio;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
