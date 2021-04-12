<template>
  <div class="q-pa-md">
    <!--    {{ get_listar_ordcom.operac }}-->
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
                v-model="fe_regdes"
                label="Emisión Desde"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fe_regdes" mask="YYYY-MM-DD">
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
                v-model="fe_reghas"
                label="Emisión Hasta"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fe_reghas" mask="YYYY-MM-DD">
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
                v-model="no_client"
                label="Cliente"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="nu_factur"
                label="Nro.Documento"
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
                v-model="co_operac"
                label="Código Operación"
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
          <!--          {{ get_listar_ordcom }}-->
          <TablaPrincipal :info="get_listar_factur.operac" />
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
    ...mapGetters("finanzas", ["get_listar_factur"])
  },
  name: "ListadodeFactura",
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      agregarServicios: false,
      agregarMateriales: false,
      buscar: "",
      tipo: 1,
      dataEdit: [],
      fe_regdes: "",
      fe_reghas: "",
      no_client: "",
      nu_docume: "",
      ti_estado: "",
      co_operac: "",
      nu_factur: ""
    };
  },
  components: {
    TablaPrincipal: () => import("./Tabla")
    // DialogAddServicios: () => import("./DialogAddServicios"),
  },
  methods: {
    ...mapActions("finanzas", ["call_listar_factur"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      // this.$store.commit("operaciones/numeroDeOperacion", this.buscar);
      await this.call_listar_factur({
        fe_regdes: `${this.fe_regdes}`,
        fe_reghas: `${this.fe_reghas}`,
        no_client: `${this.no_client}`,
        nu_factur: `${this.nu_factur}`,
        ti_estado: `${this.ti_estado}`,
        co_operac: `${this.co_operac}`
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    try {
      this.$q.loading.show();
      // await this.call_mostrar_ingreso();
      await this.call_listar_factur({
        fe_regdes: `${this.fe_regdes}`,
        fe_reghas: `${this.fe_reghas}`,
        no_client: `${this.no_client}`,
        nu_factur: `${this.nu_factur}`,
        ti_estado: `${this.ti_estado}`,
        co_operac: `${this.co_operac}`
      });
      await this.$router.replace("/finanzas/documentosdeventa?id=1");
      this.$store.commit("example/location", "Finanzas / Listado de Factura");

      // this.$q.notify({
      //   message: "1. Nueva Operacion"
      // });
      // this.$q.loading.hide();
    } catch (e) {
      console.log(e);
      // this.$q.loading.hide();
    }
  }
};
</script>
