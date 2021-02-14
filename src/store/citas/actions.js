import { axiosInstance } from "boot/axios";

export async function callCitas({ commit }) {
  const response = await axiosInstance.get(`/citas`);
  console.log(response.data);
  commit("getCitas", response.data.citas);
}

export async function callCitasFilter({ commit }, payload) {
  const response = await axiosInstance.get(`/citas/${payload}`);
  console.log(response.data);
  commit("getCitasFilter", response.data.citas);
}

export async function callCitasAdd({ commit }, payload) {
  const response = await axiosInstance.post(`/citas`, payload);
  console.log(response.data);
  return response.data;
}

export async function callCitasTipoCitas({ commit }) {
  const response = await axiosInstance.get(`/tipocita`);
  console.log(response.data);
  commit("getCitasTipos", response.data.marcas);
}

export async function call_ingresar_vehicu({ commit }, payload) {
  const response = await axiosInstance.post(`/citas/ingresar_vehicu`, payload);
  console.log(response.data);
  return response.data;
  // commit("get_ingresar_vehicu", response.data);
}
