<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Resultado de Produccion Operaciones"
      :data="dataTable"
      dense
      :filter="filter"
      row-key="name"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ titulos(col.label) }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:top-right>
        <q-input
          class="q-pl-sm"
          dense
          filled
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn size="xs" color="primary" label="Ver" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../../mixins/mixin";
export default {
  props: {
    info: {
      type: Array,
      default: () => []
    }
  },
  mixins: [MixinDefault],
  name: "Tabla",
  computed: {
    ...mapState("reportes", ["dialogCrear", "dialogDetalleOrden"]),
    dataTable() {
      let data = [];
      console.log("this.info.length", this.info.length);
      for (let index = 0; index < this.info.length; index++) {
        const element = this.info[index];
        data.push(this.ObjKeyRename(element, this.labels));
      }
      // console.log("asdasdasd", data);
      return data;
    }
  },
  data() {
    return {
      filter: "",
      tipo: 1,
      orden: null,
      dataEdit: [],
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
          name: "no_period",
          label: "no_period",
          align: "left",
          field: "no_period"
        },
        {
          name: "se_ventas",
          label: "Servicios Venta",
          align: "left",
          field: "se_ventas"
        },
        {
          name: "se_costos",
          label: "Servicios Costo",
          align: "left",
          field: "se_costos"
        },
        {
          name: "se_margen",
          label: "Servicios Margen",
          align: "left",
          field: "se_margen"
        },
        {
          name: "se_rentab",
          label: "Servicios Rentabilidad",
          align: "left",
          field: "se_rentab"
        },
        {
          name: "ma_ventas",
          label: "Materiales Venta",
          align: "left",
          field: "ma_ventas"
        },
        {
          name: "ma_costos",
          label: "Materiales Costo",
          align: "left",
          field: "ma_costos"
        },
        {
          name: "ma_margen",
          label: "Materiales Margen",
          align: "left",
          field: "ma_margen"
        },
        {
          name: "ma_rentab",
          label: "Materiales Rentabilidad",
          align: "left",
          field: "ma_rentab"
        },
        {
          name: "ma_sd",
          label: "Sin Despachar",
          align: "left",
          field: "ma_sd"
        },
        {
          name: "to_ventas",
          label: "Total Venta",
          align: "left",
          field: "to_ventas"
        },
        {
          name: "to_costos",
          label: "Total Costo",
          align: "left",
          field: "to_costos"
        },
        {
          name: "to_margen",
          label: "Total Margen",
          align: "left",
          field: "to_margen"
        },
        {
          name: "to_rentab",
          label: "Total Rentabilidad",
          align: "left",
          field: "to_rentab"
        }
      ],
      data: []
    };
  },
  methods: {
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  },
  async created() {
    try {
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style scoped></style>
