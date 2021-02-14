export function getUsers(state, payload) {
  state.getUsers = payload;
}

export function getUsersFilter(state, payload) {
  state.getUsersFilter = payload;
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
