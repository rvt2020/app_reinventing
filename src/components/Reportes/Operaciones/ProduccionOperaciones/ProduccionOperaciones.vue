<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-12 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-select
                filled
                dense
                v-model="tip_pro"
                :options="optionstip_pro"
                option-value="value"
                option-label="name"
                emit-value
                map-options
                label="Tipo de Producción"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-select
                filled
                dense
                v-model="tip_sed"
                :options="optionstip_sed"
                option-value="value"
                option-label="name"
                emit-value
                map-options
                label="Sede"
              />
            </div>
            <!--
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                dense
                filled
                v-model="cod_ope"
                label="Cliente"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input dense filled v-model="pla_veh" label="Placa" />
            </div> -->
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fec_des"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fec_des" mask="YYYY-MM-DD">
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
                v-model="fec_has"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fec_has" mask="YYYY-MM-DD">
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
              <q-select
                filled
                dense
                v-model="tip_rep"
                :options="optionstip_rep"
                option-value="value"
                option-label="name"
                emit-value
                map-options
                label="Tipo de Reporte"
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
    <div>
      <div class="row">
        <div class="col">
          <!--          {{ get_produccion_operaciones.resultado[0] }}-->
          <Tabla :info="get_produccion_operaciones.resultado" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
let timeStamp = Date.now();
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "Kardex",
  computed: {
    ...mapGetters("reportes", ["get_produccion_operaciones"])
  },
  data() {
    return {
      cod_ope: "",
      pla_veh: "",
      fec_des: date.formatDate(timeStamp, "YYYY-MM-DD"),
      fec_has: date.formatDate(timeStamp, "YYYY-MM-DD"),
      tip_rep: "R",
      tip_sed: null,
      tip_pro: null,
      fecha_ini: "",
      fecha_fin: "",
      model: null,
      optionstip_rep: [
        {
          name: "Detallado",
          value: "D"
        },
        {
          name: "Resumido",
          value: "R"
        }
      ],
      optionstip_pro: [
        {name: "[Todos]", value: "0"},
        {name: "Autos", value: "1"},
        {name: "Motos", value: "2"},
        {name: "Conversiones", value: "3"},
        {name: "Mecánica", value: "4"}
      ],
      optionstip_sed: [
        {name: "[Todas]", value: "0"},
        {name: "Jirón Gregorio Paredes - LIMA", value: "1"},
        {name: "Av. 17 - Mz H Lote 4a - VILLA EL SALVADOR", value: "2"},
        {name: "Av. Mansiche - TRUJILLO", value: "3"},
        {name: "Av. Ayabaca - ICA", value: "4"}
      ],
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    Tabla: () => import("./Tabla")
  },
  methods: {
    ...mapActions("reportes", ["call_produccion_operaciones"]),
    async buscarOperaciones() {
      console.log("buscarOperaciones");
      this.$q.loading.show();
      await this.call_produccion_operaciones({
        cod_ope: this.cod_ope,
        pla_veh: this.pla_veh,
        fec_des: this.fec_des,
        fec_has: this.fec_has,
        tip_rep: this.tip_rep,
        tip_pro: this.tip_pro,
        tip_sed: this.tip_sed
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_produccion_operaciones({
      cod_ope: this.cod_ope,
      pla_veh: this.pla_veh,
      fec_des: this.fec_des,
      fec_has: this.fec_has,
      tip_rep: this.tip_rep,
      tip_pro: this.tip_pro,
      tip_sed: this.tip_sed
    });
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
