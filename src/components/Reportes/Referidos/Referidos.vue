<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-12 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-input
                dense
                filled
                v-model="no_client"
                label="Referido"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fe_ciedes"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fe_ciedes" mask="YYYY-MM-DD">
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
                v-model="fe_ciehas"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fe_ciehas" mask="YYYY-MM-DD">
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
          <!--          {{ get_produccion_operaciones.resultado[0] }}-->
          <Tabla :info="get_referi_comisi.resultado" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "Kardex",
  computed: {
    ...mapState("reportes", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("reportes", ["get_referi_comisi"]),
  },
  data() {
    return {
      no_client: "",
      fe_ciedes: "",
      fe_ciehas: "",
      cod_emp: "",
      cod_alm: "",
      nom_art: "",
      options_ti_modrep: [
        {
          name: "Tipo de Landing",
          value: "1",
        },
        {
          name: "Landing / Zona",
          value: "2",
        },
        {
          name: "Landing / Asesor / Zona",
          value: "3",
        },
      ],
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
  components: {
    Tabla: () => import("./Tabla"),
  },
  methods: {
    ...mapActions("reportes", ["call_referi_comisi"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_referi_comisi({
        no_client: this.no_client,
        fe_ciedes: this.fe_ciedes,
        fe_ciehas: this.fe_ciehas,
      });
      this.$q.loading.hide();
    },
  },
  async created() {
    this.$q.loading.show();
    await this.call_referi_comisi({
      no_client: this.no_client,
      fe_ciedes: this.fe_ciedes,
      fe_ciehas: this.fe_ciehas,
    });
    this.$q.loading.hide();
  },
};
</script>

<style scoped></style>
