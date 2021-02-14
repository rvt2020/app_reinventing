<template>
  <div class="q-pa-md">
    <!--    {{ getOperacionesAbrir_operacion }}-->
    <!-- {{ get_lista_operaci_evalua.result[0] }} -->
    <!--    Buscar Operacion-->
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-8 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="buscar_operacion"
                label="Operacion"
                clearable
              />
            </div>
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="buscar_placa"
                label="Placa"
                clearable
              />
            </div>
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                v-model="buscar_tecnico"
                filled
                dense
                type="text"
                label="Tecnico"
                clearable
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-btn size="md" color="red" type="submit" icon-right="search" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-2"></div>
    </div>
    <!--    Datos - Vehiculos - Cliente-->
    <div>
      <!-- {{ get_lista_opeser_ini_fin.result[0] }} -->
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <TablaPrincipalIniFin :info="get_lista_opeser_ini_fin.result" />
        </div>
      </div>
      <!-- TablaMateriales -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("operaciones", ["get_lista_opeser_ini_fin"])
  },
  name: "AbrirOperacion",
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      agregarServicios: false,
      agregarMateriales: false,
      buscar: "",
      buscar_cliente: "",
      buscar_placa: "",
      buscar_operacion: "",
      buscar_tecnico: ""
    };
  },
  components: {
    TablaPrincipalIniFin: () => import("./TablaPrincipalIniFin")
    // DialogAddServicios: () => import("./DialogAddServicios"),
  },
  methods: {
    ...mapActions("operaciones", ["call_lista_opeser_ini_fin"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      // this.$store.commit("operaciones/numeroDeOperacion", this.buscar);
      await this.call_lista_opeser_ini_fin({
        cod_ope: `${this.buscar_operacion}`,
        pla_veh: `${this.buscar_placa}`,
        tec_aut: `${this.buscar_tecnico}`
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_lista_opeser_ini_fin({
      cod_ope: "",
      pla_veh: "",
      tec_aut: ""
    });
    this.$router.replace("/operaciones?id=5");
    // this.$q.notify({
    //   message: "5. Inicio y Fin del Servicio",
    // });
    this.$q.loading.hide();
  }
};
</script>
