<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-8 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-5 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fec_des"
                label="Fecha Cierre Desde"
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
            <div class="col-xs-12 col-sm-5 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fec_has"
                label="Fecha Cierre Hasta"
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
          <!--          {{ get_listar_landin.resultado[0] }}-->
          <Tabla :info="get_listar_cerrad.resultado" />
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
    ...mapGetters("operaciones", ["get_listar_cerrad"]),
  },
  data() {
    return {
      cod_ope: "",
      pla_veh: "",
      fec_des: date.formatDate(timeStamp, "YYYY-MM-DD"),
      fec_has: date.formatDate(timeStamp, "YYYY-MM-DD"),
      fecha_ini: "",
      fecha_fin: "",
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
  components: {
    Tabla: () => import("./Tabla"),
  },
  methods: {
    ...mapActions("operaciones", ["call_listar_cerrad"]),
    async buscarOperaciones() {
      console.log("buscarOperaciones");
      this.$q.loading.show();
      await this.call_listar_cerrad({
        co_operac: this.cod_ope,
        co_plaveh: this.pla_veh,
        fe_ciedes: this.fec_des,
        fe_ciehas: this.fec_has,
      });
      this.$q.loading.hide();
    },
  },
  async created() {
    this.$q.loading.show();
    await this.call_listar_cerrad({
        co_operac: this.cod_ope,
        co_plaveh: this.pla_veh,
        fe_ciedes: date.formatDate(timeStamp, "YYYY-MM-DD"),
        fe_ciehas: date.formatDate(timeStamp, "YYYY-MM-DD"),
    });
    this.$q.loading.hide();
  },
};
</script>

<style scoped></style>
