<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-8 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-4 q-pa-xs">
              <!--              {{ get_tipo_agrupa }}-->
              <q-select
                filled
                dense
                v-model="tip_agr"
                :options="get_tipo_agrupa.resultado"
                option-value="co_catego"
                option-label="no_catego"
                map-options
                emit-value
                label="Tipo de Agrupamiento"
              />
            </div>
            <div class="col-xs-12 col-sm-4 q-pa-xs">
              <!--              {{ get_fecha_actualizacion }}-->
              <q-select
                filled
                dense
                v-model="fec_act"
                :options="get_fecha_actualizacion.resultado"
                option-label="fec_act"
                option-value="fec_act"
                emit-value
                map-options
                label="Fecha de Actualizacion"
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
          <!--          {{ get_reporte_diario }}-->
          <Tabla :info="get_reporte_diario.resultado" />
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
    ...mapGetters("reportes", [
      "get_reporte_diario",
      "get_tipo_agrupa",
      "get_fecha_actualizacion"
    ])
  },
  data() {
    return {
      fecha_ini: "",
      fecha_fin: "",
      tip_agr: "",
      fec_act: "",
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    Tabla: () => import("./Tabla")
  },
  methods: {
    ...mapActions("reportes", [
      "call_reporte_diario",
      "call_tipo_agrupa",
      "call_fecha_actualizacion"
    ]),
    async buscarOperaciones() {
      this.$q.loading.show();
      console.log("buscarOperaciones");
      await this.call_reporte_diario({
        tip_agr: this.tip_agr,
        fec_act: this.fec_act
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_reporte_diario({
      tip_agr: this.tip_agr,
      fec_act: this.fec_act
    });
    await this.call_tipo_agrupa();
    await this.call_fecha_actualizacion();
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
