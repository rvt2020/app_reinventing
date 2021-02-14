export function getMateriales(state, payload) {
  state.getMateriales = payload;
}

export function getMaterialesFilter(state, payload) {
  state.getMaterialesFilter = payload;
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

export function setMaterialesEmpresas(state, payload) {
  state.setMaterialesEmpresas = payload;
}

export function setMaterialesCategorias(state, payload) {
  state.setMaterialesCategorias = payload;
}
