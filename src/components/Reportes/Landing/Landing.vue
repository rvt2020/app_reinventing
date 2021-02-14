<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-md-10 col-xs-12 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fecha_ini"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha_ini" mask="YYYY-MM-DD">
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
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-input
                clearable
                filled
                dense
                v-model="fecha_fin"
                label="Fecha Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha_fin" mask="YYYY-MM-DD">
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
            <div class="col-xs-12 col-sm-3 q-pa-xs">
              <q-select
                filled
                dense
                v-model="ti_modrep"
                :options="options_ti_modrep"
                option-value="value"
                option-label="name"
                emit-value
                map-options
                label="Tipo de Reporte"
              />
            </div>
            <div class="col-xs-12 col-sm-1 q-pa-xs">
              <q-btn size="md" color="red" type="submit" icon-right="search" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-0"></div>
    </div>
    <div>
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <!-- {{ get_report_gestio }} -->
          <Tabla :info="get_report_gestio.resultado" />
        </div>
      </div>
      <!-- TablaMateriales -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "Kardex",
  computed: {
    ...mapState("reportes", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("landing", ["get_report_gestio"]),
  },
  data() {
    return {
      fecha_ini: "",
      fecha_fin: "",
      model: null,
      ti_modrep: "",
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
    ...mapActions("landing", ["call_report_gestio"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_report_gestio({
        fe_regdes: this.fecha_ini,
        fe_reghas: this.fecha_fin,
        ti_modrep: this.ti_modrep,
      });
      this.$q.loading.hide();
    },
  },
  async created() {
    this.$q.loading.show();
    await this.call_report_gestio({
      fe_regdes: this.fecha_ini,
      fe_reghas: this.fecha_fin,
      ti_modrep: this.ti_modrep,
    });
    this.$q.loading.hide();
  },
};
</script>

<style scoped></style>
