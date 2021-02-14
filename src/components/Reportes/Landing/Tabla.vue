<template>
  <div>
    <!-- {{ info }} -->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Landings"
      :data="dataTable"
      dense
      :filter="filter"
      row-key="name"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
    >
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
      <!-- <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="primary"
            label="Movimientos"
            @click="generarOperacion(props.row)"
          />
        </q-td>
      </template> -->
    </q-table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../mixins/mixin";
export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
  name: "Tabla",
  computed: {
    // ...mapState("reportes", ["dialogCrear", "dialogDetalleOrden"]),
    // ...mapGetters("reportes", ["get_rep_invent_valori"])
    dataTable() {
      let data = [];
      console.log("this.info.length", this.info.length);
      for (let index = 0; index < this.info.length; index++) {
        const element = this.info[index];
        data.push({
          ...this.ObjKeyRename(element, this.labels),
        });
      }
      // console.log("asdasdasd", data);
      return data;
    },
  },
  mixins: [MixinDefault],
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
        rowsPerPage: 1000,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Empresa",
          align: "left",
          field: (row) => row.no_empres,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "no_almace",
          align: "center",
          label: "Almacén",
          field: "no_almace",
          sortable: true,
        },
        {
          name: "co_articu",
          label: "Código",
          field: "co_articu",
          sortable: true,
        },
        { name: "no_articu", label: "Artículo", field: "no_articu" },
        { name: "ca_articu", label: "Cantidad", field: "ca_articu" },
        { name: "im_preuni", label: "Precio Unitario", field: "im_preuni" },
        {
          name: "im_pretot",
          label: "Precio Total",
          field: "im_pretot",
          sortable: true,
        },
        {
          name: "accion",
          label: "Accion",
          field: "accion",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    generarOperacion(val) {
      this.$router.push(`/reportes/kardex?id=${val.co_articu}`);
    },
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
  },
};
</script>

<style scoped></style>
