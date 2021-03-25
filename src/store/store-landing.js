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
  get_listar_landin_result: [],
  get_listar_arcadj_landin: [],
  get_tcproduc: [],
  get_tctippla: [],
  get_tcdocume: [],
  get_tcdocumeactivapre: [],
  get_tcentida: [],
  get_tcafirma: [],
  get_tcaprrec: [],
  dialogCrear: false,
  get_listar_bitaco: [],
  get_report_gestio: [],
  get_tcdocumerechaz: []
};

const mutations = {
  get_listar_landin(state, payload) {
    state.get_listar_landin = payload; // payload : información o data  luego se va al state (arriba)
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
  },
  get_listar_landin_result(state, payload) {
    state.get_listar_landin_result = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_listar_arcadj_landin(state, payload) {
    state.get_listar_arcadj_landin = payload; // payload : información o data  luego se va al state (arriba)
  },
  
  get_tcproduc(state, payload) {
    state.get_tcproduc = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_tctippla(state, payload) {
    state.get_tctippla = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_tcdocume(state, payload) {
    state.get_tcdocume = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_tcentida(state, payload) {
    state.get_tcentida = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_tcafirma(state, payload) {
    state.get_tcafirma = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_tcaprrec(state, payload) {
    state.get_tcaprrec = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_tcdocumeactivapre(state, payload) {
    state.get_tcdocumeactivapre = payload; // payload : información o data  luego se va al state (arriba)
  },
  get_tcdocumerechaz(state, payload) {
    state.get_tcdocumerechaz = payload;
  }
  
};

const actions = {

  // CALLS DE LANDINS PRINCIPAL
  async call_listar_landin({ commit }, payload) {
    const response = await axiosInstance.post(`comerc/listar_landin`, payload);
    commit("get_listar_landin", response.data);
  },
  async call_insert_bitges({ commit }, payload) {
    const response = await axiosInstance.post(`/comerc/insert_bitges`, payload);
    // commit("get_insert_ordcom", response.data);
    return response.data;
  },
  async call_insert_arcadj({ commit }, payload) {
    const response = await axiosInstance.post(`/comerc/insert_arcadj`, payload);
    return response.data;
  },
  async call_update_landin({ commit }, payload) {
    const response = await axiosInstance.post(`/comerc/update_landin`, payload);
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
  },

  // CALL DE LANDINGS PRECALIFICADAS
  async call_listar_landin_result({ commit }, payload) {
    const response = await axiosInstance.post(`comerc/listar_landin_result`, payload);
    commit("get_listar_landin_result", response.data);
  },
  async call_listar_arcadj_landin({ commit }, payload) {
    
    const response = await axiosInstance.post(`comerc/listar_arcadj_landin`, payload);
    return response.data;
    //commit("get_listar_arcadj_landin", response.data);
  },

  async call_tcproduc({ commit }) {
    const response = await axiosInstance.get(`comerc/tcproduc`);
    commit("get_tcproduc", response.data);
  },

  async call_tctippla({ commit }) {
    const response = await axiosInstance.get(`comerc/tctippla`);
    commit("get_tctippla", response.data);
  },
  
  async call_tcdocume({ commit }) {
    const response = await axiosInstance.get(`comerc/tcdocume`);
    commit("get_tcdocume", response.data);
  },
  
  async call_tcentida({ commit }) {
    const response = await axiosInstance.get(`comerc/tcentida`);
    commit("get_tcentida", response.data);
  },
  
  async call_tcafirma({ commit }) {
    const response = await axiosInstance.get(`comerc/tcafirma`);
    commit("get_tcafirma", response.data);
  },
  
  async call_tcaprrec({ commit }) {
    const response = await axiosInstance.get(`comerc/tcaprrec`);
    commit("get_tcaprrec", response.data);
  },
  
  async call_tcdocumeactivapre({ commit }) {
    const response = await axiosInstance.get(`comerc/tcdocumeactivapre`);
    commit("get_tcdocumeactivapre", response.data);
  },
  
  async call_tcdocumerechaz({ commit }) {
    const response = await axiosInstance.get(`comerc/tcdocumerechaz`);
    commit("get_tcdocumerechaz", response.data);
  }
  
};

// UNA CONSUMIDA LA WS--- VOY AQUI Y LO PINTO
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
  },
  get_listar_landin_result(state) {
    return state.get_listar_landin_result;
  },
  get_listar_arcadj_landin(state) {
    return state.get_listar_arcadj_landin;
  },
  get_tcproduc(state) {
    return state.get_tcproduc;
  },
  get_tctippla(state) {
    return state.get_tctippla;
  },
  get_tcdocume(state) {
    return state.get_tcdocume;
  },
  get_tcentida(state) {
    return state.get_tcentida;
  },
  get_tcafirma(state) {
    return state.get_tcafirma;
  },
  get_tcaprrec(state) {
    return state.get_tcaprrec;
  },
  get_tcdocumeactivapre(state) {
    return state.get_tcdocumeactivapre;
  },
  get_tcdocumerechaz(state) {
    return state.get_tcdocumerechaz;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
