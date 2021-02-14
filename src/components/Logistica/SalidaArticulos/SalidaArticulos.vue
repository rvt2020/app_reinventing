<template>
  <q-page>
    <div>
      <q-tabs
        class="text-grey-5"
        active-color="primary"
        indicator-color="primary"
        v-model="tab"
        narrow-indicator
        align="justify"
      >
        <q-tab name="1" label="1. Salida OP" />
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
        >
          <q-tab-panel name="1">
            <TablaSalidaOP />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <!--    <q-separator color="indigo" />-->
  </q-page>
</template>

<script>
export default {
  name: "SalidaArticulos",
  data() {
    return {
      tab: "1"
    };
  },
  components: {
    TablaSalidaOP: () => import("./SalidaOP/SalidaOP")
  },
  methods: {
    boton(val) {
      // console.log("Boton en Materiales");
      this.tipo = val;
      if (val === 1) {
        // console.log("Boton en Materiales 1");
        // this.dialogCrear = true;
        // console.log("se preciono el boton");
        this.$store.commit("materiales/dialogCrear", true);
      } else if (val === 2) {
        this.dataEdit = this.$store.state.materiales.dataEdit;
        // console.log("Boton en Materiales 2");
        // this.dialogCrear = true;
        // console.log("se preciono el boton");
        this.$store.commit("materiales/dialogCrear", true);
      }
    }
  },
  async created() {
    this.$store.commit("example/location", "Tramitedoc");
    if (this.$route.query.id != undefined) {
      this.tab = `${this.$route.query.id}`;
    }
  }
};
</script>
