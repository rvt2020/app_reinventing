<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-header-class="text-brown"
      title="Lista de Ingreso Vehicular"
      :data="info"
      dense
      :filter="filter"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
    >
      <template v-slot:top-right>
        <div class="row">
          <div class="q-pa-xs">
            <q-btn
              color="primary"
              label="Buscar Operacion"
              @click="buscarOperacion"
            />
          </div>
          <div class="q-pa-xs">
            <q-input
              filled
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="primary"
            label="Generar Operacion"
            @click="generarOperacion(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog
      v-model="agregarServicios"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      full-height
      full-width
    >
      <DialogGenerarOperacion />
    </q-dialog>
    <q-dialog
      v-model="buscarServicios"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      full-height
      full-width
    >
      <DialogBuscarOperacion />
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
    info: {
      type: Array
    }
  },
  computed: {
    ...mapState("operaciones", ["agregarServicios", "buscarServicios"])
  },
  components: {
    DialogGenerarOperacion: () => import("./DialogGenerarOperacion"),
    DialogBuscarOperacion: () => import("./DialogBuscarOperacion")
  },
  data() {
    return {
      filter: "",
      maximizedToggle: false,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "N°",
          align: "left",
          field: row => row.co_aduana,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_plaveh",
          align: "center",
          label: "Placa",
          field: "co_plaveh",
          sortable: true
        },
        {
          name: "no_marveh",
          label: "Marca",
          field: "no_marveh",
          sortable: true
        },
        { name: "no_modveh", label: "Modelo", field: "no_modveh" },
        { name: "nu_anomod", label: "Año", field: "nu_anomod" },
        { name: "no_colveh", label: "Color", field: "no_colveh" },
        {
          name: "no_entsal",
          label: "Tipo de Movimiento",
          field: "no_entsal",
          sortable: true
        },
        {
          name: "fe_regist",
          label: "Fecha de Registro",
          field: "fe_regist",
          sortable: true
        },
        {
          name: "ho_regist",
          label: "Hora de Registro",
          field: "ho_regist",
          sortable: true
        },
        {
          name: "no_chofer",
          label: "Conductor",
          field: "no_chofer",
          sortable: true
        },
        {
          name: "no_cenope",
          label: "Centro de Operaciones",
          field: "no_cenope",
          sortable: true
        },
        {
          name: "de_ingsal",
          label: "Descripción",
          field: "de_ingsal",
          sortable: true
        },
        {
          name: "accion",
          label: "Accion",
          field: "accionm",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_combo_cliente",
      "call_lista_vehiculo_ingreso",
      "call_nueva_operacion"
    ]),
    buscarOperacion() {
      this.$store.commit("operaciones/buscarServicios", true);
    },
    async generarOperacion(val) {
      this.$q.loading.show();
      await this.call_combo_cliente();
      await this.call_lista_vehiculo_ingreso(val.co_aduana);
      console.log(val);
      this.$store.commit("operaciones/agregarServicios", true);
      this.$q.loading.hide();
    }
  }
};
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 70vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
