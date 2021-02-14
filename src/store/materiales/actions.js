import { axiosInstance } from "boot/axios";

export async function callMateriales({ commit }) {
  const response = await axiosInstance.get(`/articulo/all/all`);
  console.log(response.data);
  commit("getMateriales", response.data.articulo);
}

export async function callMaterialesFilter({ commit }, payload) {
  const response = await axiosInstance.get(`/articulo/${payload}`);
  console.log(response.data);
  commit("getMaterialesFilter", response.data.articulo);
}

export async function callMaterialesAdd({ commit }, payload) {
  const response = await axiosInstance.post(`/articulo`, payload);
  // console.log(response.data);
  return response.data;
}

export async function callMaterialesUpdate({ commit }, payload) {
  const response = await axiosInstance.put(`/articulo`, payload);
  console.log(response.data);
  return response.data;
}

export async function callMaterialesEmpresas({ commit }) {
  const response = await axiosInstance.get(`/articulo/empresas`);
  // console.log(response.data);
  commit("setMaterialesEmpresas", response.data);
}

export async function callMaterialesCategorias({ commit }, payload) {
  const response = await axiosInstance.get(`/articulo_categorias/${payload}`);
  // console.log(response.data);
  commit("setMaterialesCategorias", response.data.articulo);
}
