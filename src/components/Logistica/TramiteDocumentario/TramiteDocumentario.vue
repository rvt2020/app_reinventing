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
        <q-tab name="1" label="1. Listado de T/D" />
        <q-tab name="2" label="2. Visado Solicitante" />
        <q-tab name="3" label="3. Visado Jefatura" />
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
            <ListadodeOC />
          </q-tab-panel>

          <q-tab-panel name="2">
            <div class="row">
              <div class="col">
                <VisadoJefatura />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="3">
            <div class="row">
              <div class="col">
                <VisadoGerencia />
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
    VisadoGerencia: () =>
      import(
        "components/Logistica/TramiteDocumentario/VisadoGerencia/VisadoGerencia"
      ),
    ListadodeOC: () =>
      import(
        "components/Logistica/TramiteDocumentario/ListadodeOC/ListadodeOC"
      ),
    VisadoJefatura: () =>
      import(
        "components/Logistica/TramiteDocumentario/VisadoJefatura/VisadoJefatura"
      ),
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
    this.$store.commit("example/location", "Tramitedoc");
    if (this.$route.query.id != undefined) {
      this.tab = `${this.$route.query.id}`;
    }
  }
};
</script>
