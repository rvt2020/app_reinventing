<template>
  <div class="q-pa-md">
    <!--    {{ get_listar_tradoc.operac }}-->
    <!--    Buscar Operacion-->
    <div class="row" align="center">
      <div class="col-1"></div>
      <div class="col-10 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
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
                v-model="no_provee"
                label="Proveedor"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="nu_tramit"
                label="N° de Tramite"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="ti_estado"
                label="Estado"
              />
            </div>
            <div class="col-xs-12 col-sm-1 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="co_barras"
                label="Código Artículo"
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
    <!--    Datos - Vehiculos - Cliente-->
    <div>
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <!--          {{ get_listar_tradoc }}-->
          <TablaPrincipal :info="get_listar_tradoc.operac" />
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
    ...mapGetters("tramites", ["get_listar_tradoc"])
  },
  name: "ListadodeOC",
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      agregarServicios: false,
      agregarMateriales: false,
      buscar: "",
      tipo: 1,
      dataEdit: [],
      fe_emides: "",
      fe_emihas: "",
      no_provee: "",
      nu_ordcom: "",
      ti_estado: "",
      nu_tramit: "",
      co_barras: ""
    };
  },
  components: {
    TablaPrincipal: () => import("./Tabla")
    // DialogAddServicios: () => import("./DialogAddServicios"),
  },
  methods: {
    ...mapActions("tramites", ["call_listar_tradoc"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      // this.$store.commit("operaciones/numeroDeOperacion", this.buscar);
      await this.call_listar_tradoc({
        fe_emides: `${this.fe_emides}`,
        fe_emihas: `${this.fe_emihas}`,
        no_provee: `${this.no_provee}`,
        nu_tramit: `${this.nu_tramit}`,
        co_barras: `${this.co_barras}`
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    // await this.call_mostrar_ingreso();
    await this.call_listar_tradoc({
      fe_emides: `${this.fe_emides}`,
      fe_emihas: `${this.fe_emihas}`,
      no_provee: `${this.no_provee}`,
      nu_tramit: `${this.nu_tramit}`,
      co_barras: `${this.co_barras}`
    });
    this.$router.replace("/logisticas/tramitedoc?id=1");
    this.$store.commit("example/location", "TramitesDoc / Listado de TD");

    // this.$q.notify({
    //   message: "1. Nueva Operacion"
    // });
    this.$q.loading.hide();
  }
};
</script>
