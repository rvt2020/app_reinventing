import { axiosInstance } from "boot/axios";

const actions = {
  //REGISTRA EL ENVIO DE CORREO
  async call_envia_correo({ commit }, payload) {
    const response = await axiosInstance.post(`https://api.reinventing.com.pe/v1.0/correos`, payload);
    return response.data;
  }
  
};

export default {
  namespaced: true,
  actions
};
