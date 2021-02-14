<template>
  <div class="q-pa-xs">
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      dense
      :title="titulo"
      :data="info"
      :columns="columns"
      row-key="name"
      :pagination="pagination"
      :hide-header="hideheader"
    >
      <!-- <template v-slot:top-right>
        <q-btn
          size="sm"
          color="primary"
          icon-right="add"
          label="Agregar Servicios"
          @click="agregarServiciosMateriales"
        />
      </template> -->
    </q-table>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: function () {
        return [];
      },
    },
    titulo: {
      type: String,
    },
    hideheader: {
      type: Boolean,
    },
    hidebottom: {
      type: Boolean,
    },
  },
  computed: {},
  data() {
    return {
      data: [],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 8,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Vehículo",
          align: "left",
          field: (row) => row.co_plaveh,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "co_opeser",
          align: "right",
          label: "Código",
          field: "co_opeser",
          sortable: true,
        },
        {
          name: "no_servic",
          align: "right",
          label: "Descripción",
          field: "no_servic",
          sortable: true,
        },
        {
          name: "no_unimed",
          align: "right",
          label: "Unidad Medida",
          field: "no_unimed",
          sortable: true,
        },
        {
          name: "no_grafam",
          align: "right",
          label: "Gran Familia",
          field: "no_grafam",
          sortable: true,
        },
        {
          name: "ca_uniori",
          align: "right",
          label: "Cantidad",
          field: "ca_uniori",
          sortable: true,
        },
        {
          name: "im_preori",
          align: "right",
          label: "P.U.",
          field: "im_preori",
          sortable: true,
        },
        {
          name: "va_totori",
          align: "right",
          label: "P.T",
          field: "va_totori",
          sortable: true,
        },
        {
          name: "va_hohori",
          align: "right",
          label: "H.H	",
          field: "va_hohori",
          sortable: true,
        },
        {
          name: "va_homori",
          align: "right",
          label: "H.M",
          field: "va_homori",
          sortable: true,
        },
        {
          name: "ca_panori",
          align: "right",
          label: "C.P",
          field: "ca_panori",
          sortable: true,
        },
        {
          name: "ca_uniaju",
          align: "right",
          label: "Cantidad",
          field: "ca_uniaju",
          sortable: true,
        },
        {
          name: "im_preaju",
          align: "right",
          label: "P.U",
          field: "im_preaju",
          sortable: true,
        },
        {
          name: "va_totaju",
          align: "right",
          label: "P.T",
          field: "va_totaju",
          sortable: true,
        },
        {
          name: "va_hohaju",
          align: "right",
          label: "H.H",
          field: "va_hohaju",
          sortable: true,
        },
        {
          name: "va_homaju",
          align: "right",
          label: "H.M",
          field: "va_homaju",
          sortable: true,
        },
        {
          name: "ca_panaju",
          align: "right",
          label: "C.P",
          field: "ca_panaju",
          sortable: true,
        },
        {
          name: "co_estado",
          align: "right",
          label: "Estado",
          field: "co_estado",
          sortable: true,
        },
        {
          name: "no_tipser",
          align: "right",
          label: "Tipo de Servicio",
          field: "no_tipser",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    agregarServiciosMateriales() {
      console.log("Se preciono agregarServiciosMateriales");
      this.$emit("click");
    },
  },
  created() {},
};
</script>

<style scoped></style>
