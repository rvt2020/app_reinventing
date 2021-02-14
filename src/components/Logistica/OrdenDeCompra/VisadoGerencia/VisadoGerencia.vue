<template>
  <div class="q-pa-md">
    <!--        {{ get_listar_pendie_visado_gerencia }}-->
    <q-banner
      v-if="get_listar_pendie_visado_gerencia.res == 'ko'"
      dense
      inline-actions
      class="text-white bg-red"
    >
      {{ get_listar_pendie_visado_gerencia.message }} /
      {{ get_listar_pendie_visado_gerencia.operac }}
      <template v-slot:action>
        <q-btn flat color="white" label="Recargar" />
      </template>
    </q-banner>
    <!--    Buscar Operacion-->
    <div class="row" align="center">
      <div class="col-1"></div>
      <div class="col-10 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <!--              <q-btn size="md" color="red" type="submit" icon-right="search" />-->
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fe_emides"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fe_emides" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fe_emihas"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fe_emihas" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="OrdendeCompra"
                label="Orden de Compra"
              />
            </div>
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-btn size="md" color="red" type="submit" icon-right="search" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-1"></div>
    </div>
    <!--    Datos - Vehiculos - Cliente-->
    <div>
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <!--          {{ get_listar_ordcom }}-->
          <TablaPrincipal :info="get_listar_pendie_visado_gerencia.result" />
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
    ...mapGetters("logisticas", ["get_listar_pendie_visado_gerencia"])
  },
  name: "VisadoGerencia",
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      agregarServicios: false,
      agregarMateriales: false,
      OrdendeCompra: "",
      co_ordcom: "",
      buscar: "",
      fe_emides: "",
      fe_emihas: "",
      no_provee: "",
      nu_ordcom: "",
      ti_estado: "",
      co_barras: ""
    };
  },
  components: {
    TablaPrincipal: () => import("./Tabla")
    // DialogAddServicios: () => import("./DialogAddServicios"),
  },
  methods: {
    ...mapActions("logisticas", ["call_listar_pendie_visado_gerencia"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      // this.$store.commit("operaciones/numeroDeOperacion", this.buscar);
      await this.call_listar_pendie_visado_gerencia({
        co_ordcom: `${this.co_ordcom}`,
        co_tipvis: "G"
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_listar_pendie_visado_gerencia({
      co_ordcom: `${this.co_ordcom}`,
      co_tipvis: "G"
    });
    await this.$router.replace("/logisticas/ordenesdecompra?id=3");
    this.$store.commit("example/location", "Logistica / Visado Gerencia");
    // this.$q.notify({
    //   message: "1. Nueva Operacion"
    // });
    this.$q.loading.hide();
  }
};
</script>
