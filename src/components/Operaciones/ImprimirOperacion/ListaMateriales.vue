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
          color="orange"
          icon-right="add"
          label="Agregar Materiales"
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
      default: function() {
        return [];
      }
    },
    titulo: {
      type: String
    },
    hideheader: {
      type: Boolean
    },
    hidebottom: {
      type: Boolean
    }
  },
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 8
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "co_plaveh",
          align: "left",
          label: "Placa",
          field: "co_plaveh",
          sortable: true
        },
        {
          name: "no_articu",
          align: "left",
          label: "Descripcion",
          field: "no_articu",
          sortable: true
        },
        {
          name: "ca_uniori",
          align: "left",
          label: "Cantidad",
          field: "ca_uniori",
          sortable: true
        },
        {
          name: "im_preori",
          align: "left",
          label: "Precio Unitario",
          field: "im_preori",
          sortable: true
        },
        {
          name: "im_totori",
          align: "left",
          label: "Precio Total",
          field: "im_totori",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    agregarServiciosMateriales() {
      console.log("Se preciono agregarServiciosMateriales");
      this.$emit("click");
    }
  }
};
</script>

<style scoped></style>
