<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-8 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-9">
              <q-input
                autofocus
                dense
                filled
                v-model="no_client"
                label="Cliente" 
              />
            </div>

            <div class="col-3">
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
          <Tabla :info="get_listar_llamad.resultado" />
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
    ...mapGetters("llamadas", ["get_listar_llamad"]),
  },
  data() {
    return {
      no_client: "",
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
    ...mapActions("llamadas", ["call_listar_llamad"]),
    async buscarOperaciones() {
      console.log("buscarOperaciones");
      this.$q.loading.show();
      await this.call_listar_llamad({
        no_client: this.no_client,
      });
      this.$q.loading.hide();
    },
  },
  async created() {
    this.$q.loading.show();
    await this.call_listar_llamad({
      no_client: this.no_client,
    });
    this.$q.loading.hide();
  },
};
</script>

<style scoped></style>
