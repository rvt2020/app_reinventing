export function getVehiculos(state, payload) {
  state.getVehiculos = payload;
}

export function getVehiculosFilter(state, payload) {
  state.getVehiculosFilter = payload;
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
