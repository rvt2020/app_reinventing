<template>
  <div class="q-pa-md">
    <q-card>
      <q-table
        dense
        :data="info"
        :hide-header="mode === 'grid'"
        :columns="columns"
        :row-key="order"
        :grid="mode == 'grid'"
        :filter="filter"
        :loading="loadtable"
        :pagination.sync="pagination"
        virtual-scroll
        class="my-sticky-header-table"
        color="primary"
        card-class="bg-green-1 text-brown"
        table-header-class="text-brown"
        title="Vehiculos para la Venta"
      >
        <template v-slot:top-right="props">
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

        </template>
        <template v-slot:body-cell-detail="props">
          <q-td :props="props">
            <q-btn
              size="sm"
              @click="employee_dialogActive(props.row)"
              dense
              round
              color="secondary"
              icon="pageview"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                dense
                size="sm"
                @click="generarOperacion(props.row)"
                color="green"
                label="Operación"
              />
              
            </div>
          </q-td>
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Nada que mostrar... </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </q-card>

  
    <div v-if="dialogEdit">
      <DialogEdit :tipo="tipo" :info="dataEdit" />
    </div>

  </div>
</template>

<script>
import { exportFile } from "quasar";
import { date } from "quasar";
let timeStamp = Date.now();
import { mapActions, mapGetters, mapState } from "vuex";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  props: [
    "info",
    "columns",
    "paginas",
    "exportar",
    "color",
    "order",
    "tool",
    "loadtable"
  ],
  components: {
    DialogEdit: () => import("./Editar")
  },
  computed: {
    ...mapState("vehiculos", ["dialogEdit"])
  },
  data() {
    return {
      tipo: 2,
      dataEdit: {},
      filter: "",
      mode: "list",
      invoice: {},
      pagination: {
        sortBy: this.order,
        descending: true,
        page: 1,
        rowsPerPage: 1000
      }
    };
  },
  methods: {
    generarOperacion(val) {
      this.$store.commit("example/dataIngresoVentas", val);
      this.$store.commit("example/dialogIngresoVentas", true);
    },
  }
};
</script>
<style>
.q-chip__content {
  display: block;
  text-align: center;
}
</style>
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
