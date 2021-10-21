import { axiosInstance } from "boot/axios";

const state = {
  get_listar_compra_vehicu: [],
  get_catalogo_tcmoneda: [],
  get_catalogo_tctipveh: [],
  get_catalogo_tctipdct: [],
  get_listar_vehicu: [],
  get_resultado_calculo: [],
  dialogOperacion: false,
  dialogVehiculo: false,
  get_inform_vehicu: [],
  get_inform_compra_art: [],
  documentoVenta: null
};

const mutations = {
  get_catalogo_tcmoneda(state, payload) {
    state.get_catalogo_tcmoneda = payload;
  },
  
  get_catalogo_tctipdct(state, payload) {
    state.get_catalogo_tctipdct = payload;
  },
  
  get_catalogo_tctipveh(state, payload) {
    state.get_catalogo_tctipveh = payload;
  },
  
  get_listar_compra_vehicu(state, payload) {
    state.get_listar_compra_vehicu = payload;
  },
  
  get_listar_vehicu(state, payload) {
    state.get_listar_vehicu = payload;
  },
  
  dialogOperacion(state, payload) {
    state.dialogOperacion = payload;
  },
  
  dialogVehiculo(state, payload) {
    state.dialogVehiculo = payload;
  },
  
  get_inform_vehicu(state, payload) {
    state.get_inform_vehicu = payload;
  },
  
  get_resultado_calculo(state, payload) {
    state.get_resultado_calculo = payload;
  },
  
  get_inform_compra_art(state, payload) {
    state.get_inform_compra_art = payload;
  },
  
  documentoVenta(state, payload) {
    state.documentoVenta = payload;
  } 
};

const actions = {
  //TIPO DE MONEDA
  async call_catalogo_tcmoneda({ commit }, payload) {
    const response = await axiosInstance.get(
      `/comercial/lista_tcmoneda`,
      payload
    );
    commit("get_catalogo_tcmoneda", response.data);
  },
  
  //TIPOS DE VEHICULOS
  async call_catalogo_tctipveh({ commit }, payload) {
    const response = await axiosInstance.get(
      `/comercial/lista_tctipveh`,
      payload
    );
    commit("get_catalogo_tctipveh", response.data);
  },
  
  //TIPOS DE DESCUENTO
  async call_catalogo_tctipdct({ commit }, payload) {
    const response = await axiosInstance.get(
      `/comercial/lista_tctipdct`,
      payload
    );
    commit("get_catalogo_tctipdct", response.data);
  },
  
  //LISTADO CALCULO
  async call_resultado_calculo({ commit }, payload) {
    const response = await axiosInstance.post(
      `/comercial/resultado_calculo`,
      payload
    );
    commit("get_resultado_calculo", response.data);
  },
  
  //LISTA DE COMPRAS DE VEHICULOS
  async call_listar_compra_vehicu({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/lista_compra_vehiculo`, payload);
    commit("get_listar_compra_vehicu", response.data);
  },
  
  //INFORMACION DE LA ORDEN DE COMPRA
  async call_inform_compra_art({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/datos_compra`, payload);
    commit("get_inform_compra_art", response.data);
  },
  
  //LISTA DE VEHICULOS REGISTRADOS PARA VENDER
  async call_listar_vehicu({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/listado_vehiculo`, payload);
    commit("get_listar_vehicu", response.data);
  },
  
  //INFORMACIÓN DEL VEHICULO 
  async call_inform_vehicu({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/datos_vehiculo`, payload);
    commit("get_inform_vehicu", response.data);
  },
  
  //ACTUALIZA DATOS DE VEHICULO
  async call_update_vehicu({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/update_vehiculo`, payload);
    return response.data;
  },
  
  //REGISTRA LA OPERACIÓN DE LA VENTA
  async call_insert_operac_venta({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/insert_operac_venta`, payload);
    return response.data;
  },

  //RESETEO DE CALCULO
  async call_resete_calcul({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/reseteo_calculo`, payload);
    return response.data;
  },

  //REGISTRA EL CALCULO VENTA
  async call_insert_calculo_venta({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/insert_calculo_venta`, payload);
    return response.data;
  },
  
  //REGISTRA EL VENDIDO PARA VENDER
  async call_insert_vehven({ commit }, payload) {
    const response = await axiosInstance.post(`/comercial/insert_vehicu`, payload);
    return response.data;
  }
  
};

const getters = {
  get_catalogo_tcmoneda(state) {
    return state.get_catalogo_tcmoneda;
  },
  
  get_catalogo_tctipveh(state) {
    return state.get_catalogo_tctipveh;
  },
  
  get_catalogo_tctipdct(state) {
    return state.get_catalogo_tctipdct;
  },
  
  get_resultado_calculo(state) {
    return state.get_resultado_calculo;
  },
  
  get_listar_compra_vehicu(state) {
    return state.get_listar_compra_vehicu;
  },
  
  get_listar_vehicu(state) {
    return state.get_listar_vehicu;
  },
  
  get_inform_vehicu(state) {
    return state.get_inform_vehicu;
  },
  
  get_inform_compra_art(state) {
    return state.get_inform_compra_art;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
