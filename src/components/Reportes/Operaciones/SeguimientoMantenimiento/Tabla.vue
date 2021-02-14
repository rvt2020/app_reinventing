<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Resultado de Seguimiento Mantenimiento"
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
        data.push({
          ...this.ObjKeyRename(element, this.labels)
        });
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
          name: "or_numbre",
          label: "Item",
          field: "or_numbre",
          align: "left"
        },
        {
          name: "no_client",
          label: "Cliente",
          field: "no_client",
          align: "left"
        },
        {
          name: "co_plaveh",
          label: "Placa",
          field: "co_plaveh",
          align: "left"
        },
        {
          name: "nu_telefo",
          label: "Teléfono",
          field: "nu_telefo",
          align: "left"
        },
        {
          name: "no_marcav",
          label: "Marca",
          field: "no_marcav",
          align: "left"
        },
        {
          name: "no_modelo",
          label: "Modelo",
          field: "no_modelo",
          align: "left"
        },
        {
          name: "ti_client",
          label: "Tipo Cliente",
          field: "ti_client",
          align: "left"
        },
        {
          name: "fe_entreg",
          label: "Fecha de Entrega",
          field: "fe_entreg",
          align: "left"
        },
        {
          name: "km_priing",
          label: "KM Ingreso",
          field: "km_priing",
          align: "left"
        },
        {
          name: "no_tipser",
          label: "Tipo Servicio",
          field: "no_tipser",
          align: "left"
        },
        { name: "fec_1k", label: "1000 KM", field: "fec_1k", align: "left" },
        { name: "fec_5k", label: "5000 KM", field: "fec_5k", align: "left" },
        { name: "fec_10k", label: "10000 KM", field: "fec_10k", align: "left" },
        { name: "fec_15k", label: "15000 KM", field: "fec_15k", align: "left" },
        { name: "fec_20k", label: "20000 KM", field: "fec_20k", align: "left" },
        { name: "fec_25k", label: "25000 KM", field: "fec_25k", align: "left" },
        { name: "fec_30k", label: "30000 KM", field: "fec_30k", align: "left" },
        { name: "fec_35k", label: "35000 KM", field: "fec_35k", align: "left" },
        { name: "fec_40k", label: "40000 KM", field: "fec_40k", align: "left" },
        { name: "fec_45k", label: "45000 KM", field: "fec_45k", align: "left" },
        { name: "fec_50k", label: "50000 KM", field: "fec_50k", align: "left" },
        { name: "fec_55k", label: "55000 KM", field: "fec_55k", align: "left" },
        { name: "fec_60k", label: "60000 KM", field: "fec_60k", align: "left" },
        { name: "fec_65k", label: "65000 KM", field: "fec_65k", align: "left" },
        { name: "fec_70k", label: "70000 KM", field: "fec_70k", align: "left" },
        { name: "fec_75k", label: "75000 KM", field: "fec_75k", align: "left" },
        { name: "fec_80k", label: "80000 KM", field: "fec_80k", align: "left" },
        { name: "fec_85k", label: "85000 KM", field: "fec_85k", align: "left" },
        { name: "fec_90k", label: "90000 KM", field: "fec_90k", align: "left" },
        {
          name: "fec_100k",
          label: "100000 KM",
          field: "fec_100k",
          align: "left"
        }
      ]
    };
  },
  methods: {
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  }
};
</script>

<style scoped></style>
