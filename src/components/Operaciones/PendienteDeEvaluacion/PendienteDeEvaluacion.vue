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
            <div class="col-xs-12 col-sm-5 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="buscar_cliente"
                label="Buscar por Cliente"
              />
            </div>
            <div class="col-xs-12 col-sm-5 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="buscar_placa"
                label="Buscar por Placa"
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
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <TablaPricipal :info="get_lista_operaci_evalua.result" />
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
    ...mapGetters("operaciones", ["get_lista_operaci_evalua"]),
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
    };
  },
  components: {
    TablaPricipal: () => import("./TablaPrincipal"),
    // DialogAddServicios: () => import("./DialogAddServicios"),
  },
  methods: {
    ...mapActions("operaciones", ["call_lista_operaci_evalua"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      // this.$store.commit("operaciones/numeroDeOperacion", this.buscar);
      await this.call_lista_operaci_evalua({
        nom_cli: this.buscar_cliente,
        pla_veh: this.buscar_placa,
      });
      this.$q.loading.hide();
    },
  },
  async created() {
    this.$q.loading.show();
    await this.call_lista_operaci_evalua({
      nom_cli: "",
      pla_veh: "",
    });
    this.$router.replace("/operaciones?id=3");
    // this.$q.notify({
    //   message: "3. Pendientes de Evaluacion",
    // });
    this.$q.loading.hide();
  },
};
</script>
