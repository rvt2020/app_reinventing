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
        <q-tab name="1" label="Vehiculos" />
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
        >
          <!-- VEHICULOS -->
          <q-tab-panel name="1">
            <div class="row"><div class="col"> <ListaVehiculos /> </div></div>
          </q-tab-panel>
        
        </q-tab-panels>
      </div>
    </div>
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
   //COMERCIAL
    ListaVehiculos: () => import("components/Comercial/Comercial/Ventas/ListaVehiculos"),

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
    this.$store.commit("example/location", "Comercial");
    if (this.$route.query.id != undefined) {
      this.tab = `${this.$route.query.id}`;
    }
  }
};
</script>
