<template>
  <div>
    <q-card class="full-height" square>
      <q-bar class="bg-primary text-white">
        Nueva Operacion
        <q-space />
        <q-btn dense flat icon="close" @click="cerrar">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row">
          <!-- {{ get_combo_cliente.client }} -->
          <!-- {{ clienteSelect }} -->
          <div class="col-xs-12 col-sm-9 q-px-sm">
            <q-select
              filled
              v-model="clienteSelect"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              label="Cliente o Propietario"
              :options="options"
              option-value="co_person"
              option-label="no_person"
              emit-value
              map-options
              @filter="filterFn"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <!-- <q-select
              v-model="clienteSelect"
              :options="get_combo_cliente.client"
              option-value="co_person"
              option-label="no_person"
              emit-value
              map-options
              label="Cliente o Propietario"
              filled
            /> -->
          </div>
          <div
            class="col-xs-12 col-sm-3 q-px-sm text-center"
            style="align-self: center"
          >
            <q-btn
              :loading="loadboton"
              class="full-width"
              size="md"
              color="primary"
              @click="registrarNuevaOperacion()"
              icon="check"
              label="Registrar"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <TablaVehiculos />
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
    ]),
  },
  components: {
    TablaVehiculos: () => import("./TablaVehiculos"),
  },
  data() {
    return {
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
          label: "Operación",
          align: "left",
          field: (row) => row.co_operac,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "co_opeveh",
          align: "center",
          label: "Código",
          field: "co_opeveh",
          sortable: true,
        },
        { name: "fat", label: "Familia", field: "fat", sortable: true },
        { name: "no_tiptra", label: "Tipo de Trabajo", field: "no_tiptra" },
        { name: "no_servic", label: "Descripción", field: "no_servic" },
        { name: "no_tipser", label: "U.M", field: "no_tipser" },
        { name: "im_preuni", label: "Precio", field: "im_preuni" },
        { name: "co_plaveh", label: "Vehículo", field: "co_plaveh" },
        { name: "acciones", label: "Acciones", field: "acciones" },
      ],
      columns2: [
        {
          name: "desc",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true,
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
      ],
      data: [],
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_combo_cliente",
      "call_lista_vehiculo_ingreso",
      "call_nueva_operacion",
    ]),
    filterFn(val, update, abort) {
      let asd = [];
      for (let index = 0; index < this.newoptions.length; index++) {
        const element = this.newoptions[index];
        if (element.no_person) {
          asd.push(element);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options = asd.filter(
          (v) => v.no_person.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    cerrar() {
      this.$store.commit("operaciones/agregarServicios", false);
    },
    async registrarNuevaOperacion() {
      this.loadboton = true;
      try {
        const response = await this.call_nueva_operacion({
          cod_adu: `${this.get_lista_vehiculo_ingreso.vehic[0].co_aduana}`,
          cod_per: `${this.clienteSelect}`,
          cod_usu: `${this.userLocal.co_usuari}`,
        });
        console.log(response);
        if (response.res == "ok") {
          this.$q.notify({
            message: `${response.message}`,
          });
          this.$store.commit("operaciones/agregarServicios", false);
          this.$store.commit("operaciones/numeroDeOperacion", "33");
          // this.$store.commit("operaciones/step", "2");
          this.$router.push(`/operaciones?id=2&op=${response.message}`);
          this.$router.go();
          this.loadboton = false;
        } else if (response.res == "ko") {
          this.$q.notify({
            message: `${response.message}`,
          });
          this.loadboton = false;
        }
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: `${error}`,
        });
        this.loadboton = false;
      }
    },
    async buscarSM() {
      this.$q.loading.show();
      await this.call_serv_mater_mostrar_buscar({
        cod_ope: this.$store.state.operaciones.numeroDeOperacion,
        tip_fil: this.tip_fil ? this.tipodebusqueda : "S",
        descrip: this.descrip ? this.buscarServiciosMateriales : "",
      });
      this.$q.loading.hide();
    },
    agregar(val) {
      console.log("agregar");
      console.log(val);
      this.infoMateriales.push(val);
    },
  },
  async created() {
    this.options = this.get_combo_cliente.client;
    this.newoptions = this.get_combo_cliente.client;
    this.$q.notify({
      message: "Creando",
    });
    console.log("DialogGenerarOperacion.vue");
    // await this.call_serv_mater_mostrar_buscar({
    //   cod_ope: this.$store.state.operaciones.numeroDeOperacion,
    //   tip_fil: this.tip_fil ? this.tip_fil : "S",
    //   descrip: this.descrip ? this.descrip : "",
    // });
  },
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
