import { axiosInstance } from "boot/axios";

export async function callVehiculos({ commit }) {
  const response = await axiosInstance.get(`/vehiculos/all`);
  console.log(response.data);
  commit("getVehiculos", response.data.vehiculos);
}

export async function callVehiculosFilter({ commit }, payload) {
  const response = await axiosInstance.get(`/vehiculos/${payload}`);
  console.log(response.data);
  commit("getVehiculosFilter", response.data.vehiculos);
}

export async function callVehiculosAdd({ commit }, payload) {
  const response = await axiosInstance.post(`/vehiculos`, payload);
  console.log(response.data);
  return response.data;
}

export async function callVehiculosUpdate({ commit }, payload) {
  const response = await axiosInstance.put(`/vehiculos`, payload);
  console.log(response.data);
  return response.data;
}
