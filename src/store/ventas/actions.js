import { axiosInstance } from "boot/axios";

export async function call_listado_vehiculo({ commit }) {
  const response = await axiosInstance.post(`/ventas/listado_vehiculo`, payload);
  commit("get_listado_vehiculo", response.data);
}


export async function call_datos_vehiculo({ commit }, payload) {
  const response = await axiosInstance.post(`/ventas/datos_vehiculo`, payload);
  commit("get_datos_vehiculo", response.data);
}
