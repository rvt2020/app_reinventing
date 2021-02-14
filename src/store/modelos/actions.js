import { axiosInstance } from "boot/axios";

export async function callModelos({ commit }) {
  const response = await axiosInstance.get(`/modelos/all`);
  console.log(response.data);
  commit("getModelos", response.data.modelos);
}

export async function callModelosFilter({ commit }, payload) {
  const response = await axiosInstance.get(`/modelos/${payload}`);
  console.log(response.data);
  commit("getModelosFilter", response.data.modelos);
}

export async function callModelosFilterMarca({ commit }, payload) {
  const response = await axiosInstance.get(`/modelos/marcas/${payload}`);
  console.log(response.data);
  commit("getModelosFilterMarca", response.data.modmar);
}

export async function callModelosAdd({ commit }, payload) {
  const response = await axiosInstance.post(`/modelos`, payload);
  console.log(response.data);
  return response.data;
}
