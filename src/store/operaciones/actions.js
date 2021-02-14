import { axiosInstance } from "boot/axios";

export async function callOperacionesAbrir_operacion({ commit }, payload) {
  console.log("callOperacionesAbrir_operacion", payload);
  const response = await axiosInstance.get(
    `/operacflujo/abrir_operacion/${payload}`
  );
  console.log(response.data);
  commit("getOperacionesAbrir_operacion", response.data);
}

export async function callOperacionesFilter({ commit }, payload) {
  const response = await axiosInstance.get(`/operaciones/${payload}`);
  console.log(response.data);
  commit("getOperacionesFilter", response.data.operaciones);
}

export async function callOperacionesFilterMarca({ commit }, payload) {
  const response = await axiosInstance.get(`/operaciones/marcas/${payload}`);
  console.log(response.data);
  commit("getOperacionesFilterMarca", response.data.modmar);
}

export async function callOperacionesAdd({ commit }, payload) {
  const response = await axiosInstance.post(`/operaciones`, payload);
  console.log(response.data);
  return response.data;
}

export async function call_serv_mater_mostrar_buscar({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/serv_mater_mostrar_buscar`,
    payload
  );
  console.log(response.data);
  commit("get_serv_mater_mostrar_buscar", response.data);
}

export async function call_mostrar_ingreso({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/mostrar_ingreso`,
    payload
  );
  console.log(response.data);
  commit("get_mostrar_ingreso", response.data);
}

export async function call_combo_cliente({ commit }) {
  const response = await axiosInstance.get(`/operacflujo/combo_cliente`);
  console.log(response.data);
  commit("get_combo_cliente", response.data);
}

export async function call_lista_vehiculo_ingreso({ commit }, payload) {
  const response = await axiosInstance.get(
    `/operacflujo/lista_vehiculo_ingreso/${payload}`
  );
  console.log(response.data);
  commit("get_lista_vehiculo_ingreso", response.data);
}

export async function call_nueva_operacion({ commit }, payload) {
  console.log("payload", payload);
  const response = await axiosInstance.post(
    `/operacflujo/nueva_operacion`,
    payload
  );
  console.log(response.data);
  return response.data;
}

export async function call_add_servic_opera({ commit }, payload) {
  console.log("payload", payload);
  const response = await axiosInstance.post(
    `/operacflujo/add_servic_opera`,
    payload
  );
  console.log(response.data);
  return response.data;
}

export async function call_add_materi_opera({ commit }, payload) {
  console.log("payload", payload);
  const response = await axiosInstance.post(
    `/operacflujo/add_materi_opera`,
    payload
  );
  console.log(response.data);
  return response.data;
}

export async function call_lista_sermat_evalua({ commit }, payload) {
  const response = await axiosInstance.get(
    `/operacflujo/lista_sermat_evalua/${payload}`
  );
  console.log(response.data);
  commit("get_lista_sermat_evalua", response.data);
}

export async function call_lista_operaci_evalua({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/lista_operaci_evalua`,
    payload
  );
  console.log(response.data);
  commit("get_lista_operaci_evalua", response.data);
}

export async function call_evalua_item_sermat({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/evalua_item_sermat`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_evalua_item_sermat", response.data)
}

export async function call_recalcula_sermat({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/recalcula_sermat`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_recalcula_sermat", response.data)
}

export async function call_lista_operaci_asignar({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/lista_operaci_asignar`,
    payload
  );
  console.log(response.data);
  // return response.data
  commit("get_lista_operaci_asignar", response.data);
}

export async function call_lista_sermat_asignar({ commit }, payload) {
  const response = await axiosInstance.get(
    `/operacflujo/lista_sermat_asignar/${payload}`
  );
  console.log(response.data);
  // return response.data
  commit("get_lista_sermat_asignar", response.data);
}

export async function call_combo_tecnico({ commit }) {
  const response = await axiosInstance.get(`/operacflujo/combo_tecnico`);
  console.log(response.data);
  // return response.data
  commit("get_combo_tecnico", response.data);
}

export async function call_asigna_tecnico_servicio({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/asigna_tecnico_servicio`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_asigna_tecnico_servicio", response.data)
}

export async function call_lista_opeser_ini_fin({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/lista_opeser_ini_fin`,
    payload
  );
  console.log(response.data);
  // return response.data
  commit("get_lista_opeser_ini_fin", response.data);
}

export async function call_iniciar_servicio_ordser({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/iniciar_servicio_ordser`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_iniciar_servicio_ordser", response.data)
}

export async function call_finalizar_servicio_ordser({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/finalizar_servicio_ordser`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_finalizar_servicio_ordser", response.data)
}

export async function call_servic_opera({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/servic_opera`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_servic_opera", response.data)
}

export async function call_delete_servic_opera({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/del_servic_opera`,
    payload
  );
  console.log(response.data);
  return response.data;
}

export async function call_delete_materi_opera({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/del_materi_opera`,
    payload
  );
  console.log(response.data);
  return response.data;
}

export async function call_materi_opera({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/materi_opera`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_materi_opera", response.data)
}

export async function call_buscar_operacion({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/buscar_operacion`,
    payload
  );
  console.log(response.data);
  commit("get_buscar_operacion", response.data);
}

export async function call_ingreso_vehicular({ commit }, payload) {
  const response = await axiosInstance.post(
    `/operacflujo/ingreso_vehicular`,
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("get_buscar_operacion", response.data);
}
