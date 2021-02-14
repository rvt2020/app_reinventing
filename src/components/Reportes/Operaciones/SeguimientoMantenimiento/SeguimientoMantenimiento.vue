<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-8 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                dense
                filled
                v-model="cod_ope"
                label="Numero de la Operacion"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input dense filled v-model="pla_veh" label="Placa" />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <!--              {{ get_tipo_trabajo.resultado }}-->
              <q-select
                filled
                dense
                v-model="tip_tra"
                :options="get_tipo_trabajo.resultado"
                option-value="ti_servic"
                option-label="no_tipser"
                emit-value
                map-options
                label="Tipo de Reporte"
              />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-select
                filled
                dense
                v-model="tip_cli"
                :options="optionstip_cli"
                option-value="value"
                option-label="name"
                emit-value
                map-options
                label="Tipo de Cliente"
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
          <!--          {{ get_seguimiento_mantenimiento.resultado[0] }}-->
          <Tabla :info="get_seguimiento_mantenimiento.resultado" />
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
      "get_seguimiento_mantenimiento",
      "get_tipo_trabajo"
    ])
  },
  data() {
    return {
      cod_ope: "",
      pla_veh: "",
      tip_tra: "",
      tip_cli: "",
      optionstip_cli: [
        {
          name: "Todo",
          value: 0
        },
        {
          name: "Propios",
          value: 1
        },
        {
          name: "Externos",
          value: 2
        }
      ]
    };
  },
  components: {
    Tabla: () => import("./Tabla")
  },
  methods: {
    ...mapActions("reportes", [
      "call_seguimiento_mantenimiento",
      "call_tipo_trabajo"
    ]),
    async buscarOperaciones() {
      console.log("buscarOperaciones");
      this.$q.loading.show();
      await this.call_seguimiento_mantenimiento({
        cod_ope: `${this.cod_ope}`,
        pla_veh: `${this.pla_veh}`,
        tip_tra: `${this.tip_tra ? this.tip_tra : 0}`,
        tip_cli: `${this.tip_cli ? this.tip_cli : 0}`
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_seguimiento_mantenimiento({
      cod_ope: `${this.cod_ope}`,
      pla_veh: `${this.pla_veh}`,
      tip_tra: `${this.tip_tra ? this.tip_tra : 0}`,
      tip_cli: `${this.tip_cli ? this.tip_cli : 0}`
    });
    await this.call_tipo_trabajo();
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
