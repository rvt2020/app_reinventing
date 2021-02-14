<template>
  <div class="">
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
                label="Fecha Inicio"
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
                label="Fecha Inicio"
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
                v-model="co_operac"
                label="Nro de Operación"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="co_plaveh"
                label="Placa"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input autofocus dense filled v-model="estado" label="Estado" />
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
          <!--          {{ get_listar_produc_operac_salida.message[0] }}-->
          <TablaPrincipal :info="get_listar_produc_operac_salida.message" />
        </div>
      </div>
      <!-- TablaMateriales -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "IngresoOP",
  data() {
    return {
      estado: "",
      fe_regdes: "",
      fe_reghas: "",
      no_provee: "",
      co_operac: "",
      nu_ordcom: "",
      co_plaveh: "",
      co_barras: ""
    };
  },
  computed: {
    ...mapGetters("almacen", ["get_listar_produc_operac_salida"])
  },
  methods: {
    ...mapActions("almacen", ["call_listar_produc_operac_salida"]),
    async buscarOperaciones() {
      console.log("buscarOperaciones");
      this.$q.loading.show();
      await this.call_listar_produc_operac_salida({
        fe_regdes: this.fe_regdes,
        fe_reghas: this.fe_reghas,
        co_operac: this.co_operac,
        co_plaveh: this.co_plaveh,
        il_despac: "OP"
      });
      this.$q.loading.hide();
    }
  },
  components: {
    TablaPrincipal: () => import("./Tabla")
  },
  async created() {
    this.$store.commit("example/location", "Almacen");
    this.$q.loading.show();
    await this.call_listar_produc_operac_salida({
      fe_regdes: this.fe_regdes,
      fe_reghas: this.fe_reghas,
      co_operac: this.co_operac,
      co_plaveh: this.co_plaveh,
      il_despac: "OP"
    });
    this.$router.replace("/logisticas/salidaarticulos?id=1");
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
