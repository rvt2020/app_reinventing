<template>
  <div class="q-pa-md">
    <!--    {{ get_listar_ordcom.operac }}-->
    <!--    Buscar Operacion-->
    <div class="row" align="center">
    </div>
    <div>
      <div class="row">
        <div class="col">
          <!--          {{ get_listar_ordcom }}-->
          <TablaPrincipal :info="get_listar_bandeja_general.resultado" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("tiv", ["get_listar_bandeja_general"])
  },
  name: "ListadodeTiv", //ListadodeFactura
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      agregarServicios: false,
      agregarMateriales: false,
      buscar: "",
      tipo: 1,
      co_bandej: 1,
      dataEdit: []
    };
  },
  components: {
    TablaPrincipal: () => import("./Tabla")
  },
  methods: {
    ...mapActions("tiv", ["call_listar_bandeja_general"])//,
    /*async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_listar_vehicu({
        no_marveh: `${this.no_marveh}`,
        no_modveh: `${this.no_modveh}`,
        no_colveh: `${this.no_colveh}`,
        nu_anoveh: `${this.nu_anoveh}`
      });
      this.$q.loading.hide();
    }*/
  },
  async created() {
    try {
      this.$q.loading.show();
      await this.call_listar_bandeja_general();
      //await this.$router.replace("/tramites/vehiculos");
      this.$store.commit("example/location", "TIV / Trámite Vehicular");
      this.$q.loading.hide();
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
