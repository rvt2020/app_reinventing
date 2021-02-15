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
            <div class="col-xs-12 col-sm-5 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fec_has"
                label="Fecha Fin"
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
          <Tabla :info="get_listar_landin.resultado" />
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
    ...mapGetters("landing", ["get_listar_landin"]),
  },
  data() {
    return {
      cod_ope: "",
      pla_veh: "",
      fec_des: date.formatDate(timeStamp, "YYYY-MM-DD"),
      fec_has: date.formatDate(timeStamp, "YYYY-MM-DD"),
      tip_rep: "R",
      fecha_ini: "",
      fecha_fin: "",
      model: null,
      optionstip_rep: [
        {
          name: "Detallado",
          value: "D",
        },
        {
          name: "Resumido",
          value: "R",
        },
      ],
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
  components: {
    Tabla: () => import("./Tabla"),
  },
  methods: {
    ...mapActions("landing", ["call_listar_landin"]),
    async buscarOperaciones() {
      console.log("buscarOperaciones");
      this.$q.loading.show();
      await this.call_listar_landin({
        fe_regdes: this.fec_des,
        fe_reghas: this.fec_has,
        co_person : this.$q.localStorage.getAll().UserDetalle.co_person,
        ti_landin: "3",
      });
      this.$q.loading.hide();
    },
  },
  async created() {
    this.$q.loading.show();
    await this.call_listar_landin({
      fe_regdes: date.formatDate(timeStamp, "YYYY-MM-DD"),
      fe_reghas: date.formatDate(timeStamp, "YYYY-MM-DD"),
      co_person : this.$q.localStorage.getAll().UserDetalle.co_person,
      ti_landin: "3",
    });
    this.$q.loading.hide();
  },
};
</script>

<style scoped></style>
