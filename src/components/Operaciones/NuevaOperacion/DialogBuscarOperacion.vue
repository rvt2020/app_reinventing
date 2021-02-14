<template>
  <div>
    <q-card class="full-height" square>
      <q-bar class="bg-primary text-white">
        Buscar Operacion
        <q-space />
        <q-btn dense flat icon="close" @click="cerrar">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row" align="center">
          <!--          <div class="col-2"></div>-->
          <div class="col-12 q-pb-md">
            <q-form @submit="buscarOperaciones">
              <div class="row">
                <div class="col-xs-12 col-sm-2 q-pa-xs">
                  <q-input
                    dense
                    filled
                    v-model="cod_ope"
                    type="text"
                    label="Nombre de la Operacion"
                  />
                </div>
                <div class="col-xs-12 col-sm-2 q-pa-xs">
                  <q-input
                    dense
                    filled
                    v-model="pla_veh"
                    type="text"
                    label="Placa"
                  />
                </div>
                <div class="col-xs-12 col-sm-3 q-pa-xs">
                  <q-input filled dense v-model="fec_ini" label="Fecha Inicio">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="fec_ini" mask="YYYY-MM-DD">
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
                  <q-input filled dense v-model="fec_fin" label="Fecha Fin">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="fec_fin" mask="YYYY-MM-DD">
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
                  <q-btn
                    size="md"
                    color="red"
                    type="submit"
                    icon-right="search"
                  />
                </div>
              </div>
            </q-form>
          </div>
          <!--          <div class="col-2"></div>-->
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!--        {{ get_buscar_operacion.result[0] }}-->
        <TablaBuscar :info="get_buscar_operacion.result" />
      </q-card-section>

      <!-- <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions> -->
    </q-card>
  </div>
</template>

<script>
import { storagelocal } from "../../../mixins/mixin";
import { mapActions, mapGetters } from "vuex";
const stringOptions = ["Servicios", "Materiales"];
export default {
  name: "DialogAddServicios",
  mixins: [storagelocal],
  computed: {
    ...mapGetters("operaciones", [
      "get_combo_cliente",
      "get_lista_vehiculo_ingreso",
      "get_buscar_operacion"
    ])
  },
  components: {
    TablaBuscar: () => import("./TablaBuscarOperacion")
  },
  data() {
    return {
      cod_ope: "",
      pla_veh: "",
      fec_ini: "",
      fec_fin: "",
      loadboton: false,
      clienteSelect: null,
      model: null,
      infoMateriales: [],
      infoServicios: [],
      precioUnitario: null,
      cantidad: null,
      maximizedToggle: true,
      tipodebusqueda: null,
      options: [],
      newoptions: [],
      buscarServiciosMateriales: "",
      filter: "",
      columns1: [
        {
          name: "desc",
          required: true,
          label: "Fecha de Registro",
          align: "left",
          field: row => row.co_operac,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_opeveh",
          align: "center",
          label: "Usuario",
          field: "co_opeveh",
          sortable: true
        },
        { name: "fat", label: "N° Operación", field: "fat", sortable: true },
        { name: "no_tiptra", label: "Cliente", field: "no_tiptra" },
        { name: "no_servic", label: "Estado", field: "no_servic" },
        { name: "no_tipser", label: "Placa", field: "no_tipser" },
        { name: "im_preuni", label: "Marca", field: "im_preuni" },
        { name: "co_plaveh", label: "Modelo", field: "co_plaveh" },
        { name: "acciones", label: "Versión", field: "acciones" },
        { name: "acciones", label: "Año", field: "acciones" },
        { name: "acciones", label: "Color", field: "acciones" },
        { name: "acciones", label: "Chasis", field: "acciones" },
        { name: "acciones", label: "Motor", field: "acciones" },
        { name: "acciones", label: "Acciones", field: "acciones" }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_combo_cliente",
      "call_lista_vehiculo_ingreso",
      "call_nueva_operacion",
      "call_buscar_operacion"
    ]),
    cerrar() {
      this.$store.commit("operaciones/buscarServicios", false);
    },
    async buscarOperaciones() {
      this.$q.loading.show();
      await this.call_buscar_operacion({
        cod_ope: this.cod_ope,
        pla_veh: this.pla_veh,
        fec_ini: this.fec_ini,
        fec_fin: this.fec_fin
      });
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_buscar_operacion({
      cod_ope: this.cod_ope,
      pla_veh: this.pla_veh,
      fec_ini: this.fec_ini,
      fec_fin: this.fec_fin
    });
    this.$q.notify({
      message: "Creando"
    });
    console.log("DialogBuscarOperacion.vue");
    this.$q.loading.hide();
  }
};
</script>

<style scoped>
/* .my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
} */
</style>
