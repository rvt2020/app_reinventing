<template>
  <div class="q-pa-md">
    <div class="row" align="center">
      <!--      <div class="col-2"></div>-->
      <div class="col-12 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input clearable filled dense v-model="fec_des" label="Fecha Inicio">
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
              <q-input clearable filled dense v-model="fec_has" label="Fecha Fin">
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
            <div class="col-xs-12 col-sm-2 q-pa-xs">
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
            <div class="col-xs-12 col-sm-1 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="cod_art"
                label="Codigo Articulo"
              />
            </div>
            <div class="col-xs-12 col-sm-1 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="nom_art"
                label="Nombre Articulo"
              />
            </div>
            <div class="col-xs-12 col-sm-1 q-pa-xs">
              <q-input
                autofocus
                dense
                filled
                v-model="operaci"
                label="Operaciones"
              />
            </div>
            <div class="col-xs-12 col-sm-1 q-pa-xs">
              <q-btn size="md" color="red" type="submit" icon-right="search" />
            </div>
          </div>
        </q-form>
      </div>
      <!--      <div class="col-2"></div>-->
    </div>
    <div>
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <!--          {{ get_rep_kardex }}-->
          <Tabla :info="get_rep_kardex.resultado" />
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
      "get_rep_kardex",
      "get_empresas",
      "get_combo_almacen"
    ])
  },
  data() {
    return {
      fec_des: "",
      fec_has: "",
      cod_emp: "",
      cod_alm: "",
      cod_art: "",
      nom_art: "",
      operaci: "",
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    Tabla: () => import("./Tabla")
  },
  methods: {
    ...mapActions("reportes", [
      "call_rep_kardex",
      "call_empresas",
      "call_combo_almacen"
    ]),
    async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_rep_kardex({
        fec_des: `${this.fec_des}`, // fecha inicio
        fec_has: `${this.fec_has}`, // fecha fin
        cod_emp: `${this.cod_emp}`, // empresa (combo)
        cod_alm: `${this.cod_alm}`, // codigo almacen (combo)
        cod_art: `${this.cod_art}`, // codigo articulo
        nom_art: `${this.nom_art}`, // nombre articulo
        operaci: `${this.operaci}` // Operacion
      });
      this.$q.loading.hide();
    }
  },
  async mounted() {
    this.$q.loading.show();
    console.log(this.$route.query.id);
    if (this.$route.query.id) {
      this.cod_art = this.$route.query.id;
      await this.call_rep_kardex({
        fec_des: `${this.fec_des}`, // fecha inicio
        fec_has: `${this.fec_has}`, // fecha fin
        cod_emp: `${this.cod_emp}`, // empresa (combo)
        cod_alm: `${this.cod_alm}`, // codigo almacen (combo)
        cod_art: `${this.$route.query.id}`, // codigo articulo
        nom_art: `${this.nom_art}`, // nombre articulo
        operaci: `${this.operaci}` // Operacion
      });
    } else {
      await this.call_rep_kardex({
        fec_des: `${this.fec_des}`, // fecha inicio
        fec_has: `${this.fec_has}`, // fecha fin
        cod_emp: `${this.cod_emp}`, // empresa (combo)
        cod_alm: `${this.cod_alm}`, // codigo almacen (combo)
        cod_art: `${this.cod_art}`, // codigo articulo
        nom_art: `${this.nom_art}`, // nombre articulo
        operaci: `${this.operaci}` // Operacion
      });
    }
    await this.call_combo_almacen();
    await this.call_empresas();
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
