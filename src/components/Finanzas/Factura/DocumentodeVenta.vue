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
        <q-tab name="2" label="2. Por Cobrar" />
        <q-tab name="3" label="3. Amortizados" />
        <q-tab name="4" label="4. Cancelados" />
        <!-- <q-tab name="6" label="6. Pendiente de Finalizar Servicio" /> -->
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
        >
          <!-- LISTADO DE FACTURAS -->
          <q-tab-panel name="1">
            <div class="row"><div class="col"> <ListadodeOC /> </div></div>
          </q-tab-panel>
          
          <!-- POR COBRAR -->
          <q-tab-panel name="2">
            <div class="row"><div class="col"> <ListadodeCobrar /> </div></div>
          </q-tab-panel>
          
          <!-- AMORTIZADAS -->
          <q-tab-panel name="3">
            <div class="row"><div class="col"> <ListadodeAmortizado /> </div></div>
          </q-tab-panel>
          
          <!-- CANCELADAS  -->
          <q-tab-panel name="4">
            <div class="row"><div class="col"> <ListadodeCancelados /> </div></div>
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
    //OTROS
    InicioFin: () => import("components/Operaciones/InicioFin/InicioFin"),
    AsingarServicios: () => import("components/Operaciones/AsignarServicios/AsignarServicios"),
    
    //FACTURACION Y FINANZAS
    ListadodeOC: () => import("components/Finanzas/Factura/Emision/ListadodeOC"),
    ListadodeCobrar: () => import("components/Finanzas/Factura/PorCobrar/ListadoCobrar"),
    ListadodeAmortizado: () => import("components/Finanzas/Factura/Amortizados/ListadoAmortizado"),
    ListadodeCancelados: () => import("components/Finanzas/Factura/Cancelados/ListadoCancelados"),

    //TITULOS
    Titulos: () => import("components/Titulos")
  },
  
  methods: {
    boton(val) {
      // console.log("Boton en Materiales");
      this.tipo = val;
      if (val === 1) {
        this.$store.commit("materiales/dialogCrear", true);
      } else if (val === 2) {
        this.dataEdit = this.$store.state.materiales.dataEdit;
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
