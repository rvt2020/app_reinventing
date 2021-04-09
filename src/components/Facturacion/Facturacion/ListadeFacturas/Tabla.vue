<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Listado"
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
        <q-btn color="primary" label="Facturar" @click="crearFactura"></q-btn>
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
      <template v-slot:body-cell-no_factur="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="primary"
            :label="`${props.row.no_factur}`"
            @click="generarOperacion(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <div>
      <DialogCrear :tipo="tipo" :info="dataEdit" />
    </div>
    <q-dialog
      v-model="dialogDetalleFactura"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-up"
      full-height
      full-width
    >
      <DialogGenerarOperacion />
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../../mixins/mixin";
export default {
  mixins: [MixinDefault],
  props: {
    info: {
      type: Array
    }
  },
  computed: {
    ...mapState("facturas", ["dialogCrear", "dialogDetalleFactura"]),
    ...mapGetters("facturas", ["get_inform_factur"])
  },
  components: {
    DialogGenerarOperacion: () => import("./DialogDetalleFactura"),
    DialogCrear: () => import("./NuevaFactura"),
    Upload: () => import("./Upload")
  },
  data() {
    return {
      arcadjs: "",
      visor: false,
      upload: false,
      filter: "",
      tipo: 1,
      orden: null,
      dataEdit: [],
      select_to_arca: {},
      maximizedToggle: false,
      initialPagination: {
        sortBy: "no_factur",
        descending: true,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha",
          align: "left",
          field: row => row.fe_regist,
          format: val => `${this.formatFechaCorta(val)}`,
          sortable: true
        },
        {name: "co_docide", align: "center", label: "DNI", field: "co_docide", sortable: true},
        {name: "no_client", label: "Cliente", field: "no_client", sortable: true},
        {name: "no_factur", label: "Código", field: "no_factur", sortable: true},
        {name: "nu_docume", label: "Nro.Documento", field: "nu_docume", sortable: true},
        {name: "no_estado", label: "Estado", field: "no_estado"},
        { name: "no_docume", label: "Tipo", field: "no_docume" },
        {
          name: "im_basimp",
          label: "Precio Neto",
          field: "im_basimp",
          sortable: true
        },
        {
          name: "im_totigv",
          label: "IGV",
          field: "im_totigv",
          sortable: true
        },
        {
          name: "im_pretot",
          label: "Total",
          field: "im_pretot",
          sortable: true
        },
        {
          name: "accion",
          label: "Accion",
          field: "accion",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("facturas", [
      "call_inform_factur",
      "call_listar_operac_encont",
      "call_listar_detall_factur",
      "call_delete_factur",
      "call_listar_factur"
    ]),
    
    async crearFactura() {
      console.log("Crear Factura");
      this.$store.commit("facturas/dialogCrear", true);
    },
    
    async generarOperacion(val) {
      console.log("generarOperacion", val);
      this.$q.loading.show();
      this.$store.commit("facturas/facturaDoc", val.co_factur);
      await this.call_inform_factur({
        co_factur: `${val.co_factur}`
      });
      await this.call_listar_operac_encont({
        co_factur: `${val.co_factur}`,
        no_client: "",
        co_plaveh: "",
        co_operac: ""
      });
      await this.call_listar_detall_factur({
        co_factur: `${val.co_factur}`
      });
      console.log(val);
      this.$q.notify({
        message: `${val.co_factur}`
      });
      this.$store.commit("facturas/dialogDetalleFactura", true);
      this.$q.loading.hide();
    }
  }
};
</script>
