<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-12 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-4 q-pa-xs">
              <q-select
                filled
                dense
                v-model="cod_emp"
                :options="get_empresas.empresa"
                option-label="no_empres"
                option-value="co_empres"
                map-options
                emit-value
                label="Empresa"
              >
                <template v-if="cod_emp" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="cod_emp = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-4 q-pa-xs">
              <q-select
                filled
                dense
                v-model="cod_alm"
                :options="get_combo_almacen.resultado"
                option-label="no_almace"
                option-value="co_almace"
                map-options
                emit-value
                label="Almacen"
              >
                <template v-if="cod_alm" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="cod_alm = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="nom_art"
                label="Codigo Articulo"
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
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <!--          {{ get_rep_invent_valori }}-->
          <Tabla :info="get_rep_invent_valori.resultado" />
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
    ...mapGetters("reportes", [
      "get_rep_invent_valori",
      "get_empresas",
      "get_combo_almacen"
    ])
  },
  data() {
    return {
      fecha_ini: "",
      fecha_fin: "",
      model: null,
      cod_emp: "",
      cod_alm: "",
      nom_art: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    Tabla: () => import("./Tabla")
  },
  methods: {
    ...mapActions("reportes", [
      "call_rep_invent_valori",
      "call_empresas",
      "call_combo_almacen"
    ]),
    async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_rep_invent_valori({
        cod_emp: `${this.cod_emp}`,
        cod_alm: `${this.cod_alm}`,
        nom_art: `${this.nom_art}`
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_rep_invent_valori({
      cod_emp: `${this.cod_emp}`,
      cod_alm: `${this.cod_alm}`,
      nom_art: `${this.nom_art}`
    });
    await this.call_combo_almacen();
    await this.call_empresas();
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
