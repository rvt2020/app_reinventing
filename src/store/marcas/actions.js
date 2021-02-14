import { axiosInstance } from "boot/axios";

export async function callMarcas({ commit }) {
  const response = await axiosInstance.get(`/marcas/all`);
  console.log(response.data);
  commit("getMarcas", response.data.marcas);
}

export async function callMarcasFilter({ commit }, payload) {
  const response = await axiosInstance.get(`/marcas/${payload}`);
  console.log(response.data);
  commit("getMarcasFilter", response.data.marcas);
}

export async function callMarcasAdd({ commit }, payload) {
  const response = await axiosInstance.post(`/marcas`, payload);
  console.log(response.data);
  return response.data;
}
