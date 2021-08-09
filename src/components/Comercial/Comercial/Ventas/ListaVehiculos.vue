<template>
  <div class="q-pa-md">
    <!--    {{ get_listar_ordcom.operac }}-->
    <!--    Buscar Operacion-->
    <div class="row" align="center">
      <div class="col-1"></div>
      <div class="col-10 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
          </div>
        </q-form>
      </div>
      <div class="col-1"></div>
    </div>
    <div>
      <div class="row">
        <div class="col">
          <!--          {{ get_listar_ordcom }}-->
          <TablaPrincipal :info="get_listar_vehicu.resultado" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("comercial", ["get_listar_vehicu"])
  },
  name: "ListadodeVehiculos", //ListadodeFactura
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      agregarServicios: false,
      agregarMateriales: false,
      buscar: "",
      tipo: 1,
      dataEdit: [],
      co_operac: "",
      co_plaveh: ""
    };
  },
  components: {
    TablaPrincipal: () => import("./Tabla")
  },
  methods: {
    ...mapActions("comercial", ["call_listar_vehicu"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_listar_vehicu({co_plaveh: `${this.co_plaveh}`});
      this.$q.loading.hide();
    }
  },
  async created() {
    try {
      this.$q.loading.show();
      // await this.call_mostrar_ingreso();
      await this.call_listar_vehicu({co_plaveh: `${this.co_plaveh}`});
      await this.$router.replace("/comercial/documentosdeventa?id=1");
      this.$store.commit("example/location", "Comercial / Listado de Vehiculos");

    } catch (e) {
      console.log(e);
    }
  }
};
</script>
