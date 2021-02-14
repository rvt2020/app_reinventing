import { axiosInstance } from "boot/axios";

export async function callVersioncar({ commit }) {
  const response = await axiosInstance.get(`/versioncar/all`);
  console.log(response.data);
  commit("getVersioncar", response.data.versioncar);
}

export async function callVersioncarFilter({ commit }, payload) {
  const response = await axiosInstance.get(`/versioncar/${payload}`);
  console.log(response.data);
  commit("getVersioncarFilter", response.data.versioncar);
}

export async function callVersioncarAdd({ commit }, payload) {
  const response = await axiosInstance.post(`/versioncar`, payload);
  console.log(response.data);
  return response.data;
}
