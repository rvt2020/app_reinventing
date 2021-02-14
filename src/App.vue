<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import {
  Loading,

  // optional!, for example below
  // with custom spinner
  QSpinnerGears,
  QSpinnerPie,
  QSpinnerTail
} from "quasar";
export default {
  name: "App",
  created() {
    this.$q.loading.setDefaults({
      spinner: QSpinnerPie,
      message: "Cargando..",
      messageColor: "white",
      spinnerSize: 200, // in pixels
      spinnerColor: "green-6",
      backgroundColor: "bg-primary"
      // customClass: "bg-primary"
    });
  }
};
</script>
