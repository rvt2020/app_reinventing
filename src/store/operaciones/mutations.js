export function getOperacionesAbrir_operacion(state, payload) {
  state.getOperacionesAbrir_operacion = payload;
}

export function getModelosFilter(state, payload) {
  state.getModelosFilter = payload;
}

export function getModelosFilterMarca(state, payload) {
  state.getModelosFilterMarca = payload;
}

export function dialogCrear(state, payload) {
  state.dialogCrear = payload;
}

export function get_serv_mater_mostrar_buscar(state, payload) {
  state.get_serv_mater_mostrar_buscar = payload
}

export function numeroDeOperacion(state, payload) {
  state.numeroDeOperacion = payload
}

export function agregarServicios(state, payload) {
  state.agregarServicios = payload
}

export function buscarServicios(state, payload) {
  state.buscarServicios = payload
}

export function get_mostrar_ingreso(state, payload) {
  state.get_mostrar_ingreso = payload
}

export function get_combo_cliente(state, payload) {
  state.get_combo_cliente = payload
}

export function get_lista_vehiculo_ingreso(state, payload) {
  state.get_lista_vehiculo_ingreso = payload
}


export function get_lista_sermat_evalua(state, payload) {
  state.get_lista_sermat_evalua = payload
}

export function get_lista_operaci_evalua(state, payload) {
  state.get_lista_operaci_evalua = payload
}


export function operacionesid3(state, payload) {
  state.operacionesid3 = payload
}

export function operacionesid4(state, payload) {
  state.operacionesid4 = payload
}

export function get_lista_operaci_asignar(state, payload) {
  state.get_lista_operaci_asignar = payload
}

export function get_lista_sermat_asignar(state, payload) {
  state.get_lista_sermat_asignar = payload
}

export function get_combo_tecnico(state, payload) {
  state.get_combo_tecnico = payload
}

export function get_lista_opeser_ini_fin(state, payload) {
  state.get_lista_opeser_ini_fin = payload
}

export function set_get_lista_sermat_asignar(state, payload) {
  console.log("set_get_lista_sermat_asignar", payload)
  state.get_lista_sermat_asignar.servic = payload
}

export function get_buscar_operacion(state, payload) {
  state.get_buscar_operacion = payload
}
