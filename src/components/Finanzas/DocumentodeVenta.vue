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
        <q-tab name="1" label="1. Listado de Facturas" />
        <!-- <q-tab name="6" label="6. Pendiente de Finalizar Servicio" /> -->
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
        >
          <q-tab-panel name="1">
            <div class="row">
              <div class="col">
                <ListadodeOC />
              </div>
            </div>
          </q-tab-panel>

          
          <q-tab-panel name="4">
            <div class="row">
              <div class="col">
                <!--                <AsingarServicios />-->
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="5">
            <div class="row">
              <div class="col">
                <!--                <InicioFin />-->
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <!--    <q-separator color="indigo" />-->
  </q-page>
</template>

<script>
export default {
  name: "PageOperaciones",
  data() {
    return {
      tab: "1"
    };
  },
  components: {
    InicioFin: () => import("components/Operaciones/InicioFin/InicioFin"),
    AsingarServicios: () =>
      import("components/Operaciones/AsignarServicios/AsignarServicios"),
    ListadodeOC: () =>
      import("components/Finanzas/Factura/ListadodeOC"),
    Titulos: () => import("components/Titulos")
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
    this.$store.commit("example/location", "Finanzas");
    if (this.$route.query.id != undefined) {
      this.tab = `${this.$route.query.id}`;
    }
  }
};
</script>
