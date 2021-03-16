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
          name: "no_servic",
          align: "right",
          label: "Descripción",
          field: "no_servic",
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
