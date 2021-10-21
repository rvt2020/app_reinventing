<template>
  <div class="q-pa-md">
    <!--    {{ get_listar_ordcom.operac }}-->
    <!--    Buscar Operacion-->
    <div class="row" align="center">
      <div class="col-1"></div>
      <div class="col-10 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="no_marveh"
                label="Marca"
              />
            </div>
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="no_modveh"
                label="Modelo"
              />
            </div>
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="no_colveh"
                label="Color"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="nu_anoveh"
                label="Año"
              />
            </div>
            <div class="col-xs-12 col-sm-1 q-pa-xs">
              <q-btn size="md" color="red" type="submit" icon-right="search" />
            </div>
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
      no_marveh: "",
      no_modveh: "",
      no_colveh: "",
      nu_anoveh: ""
    };
  },
  components: {
    TablaPrincipal: () => import("./Tabla")
  },
  methods: {
    ...mapActions("comercial", ["call_listar_vehicu"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_listar_vehicu({
        no_marveh: `${this.no_marveh}`,
        no_modveh: `${this.no_modveh}`,
        no_colveh: `${this.no_colveh}`,
        nu_anoveh: `${this.nu_anoveh}`
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    try {
      this.$q.loading.show();
      // await this.call_mostrar_ingreso();
      await this.call_listar_vehicu({
        no_marveh: `${this.no_marveh}`,
        no_modveh: `${this.no_modveh}`,
        no_colveh: `${this.no_colveh}`,
        nu_anoveh: `${this.nu_anoveh}`
      });
      //await this.$router.replace("/comercial/comercial");
      this.$store.commit("example/location", "Comercial / Listado de Vehiculos");
      this.$q.loading.hide();
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
