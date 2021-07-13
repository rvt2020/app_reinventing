export function get_datos_vehiculo(state, payload) {
  state.get_datos_vehiculo = payload;
}

export function get_listado_vehiculo(state, payload) {
  state.get_listado_vehiculo = payload;
}


export function dialogCrear(state, payload) {
  state.dialogCrear = payload;
}

export function dialogEdit(state, payload) {
  state.dialogEdit = payload;
}

export function dataEdit(state, payload) {
  state.dataEdit = payload;
}

export function activarEdit(state, payload) {
  state.activarEdit = payload;
}
