<template>
  <div class="row">
    <div class="col-xs-12 col-md-12 q-pa-xs">
      <!--      {{ get_listar_produc_encont }}-->
      <q-card flat bordered>
        <div class="row">
          <div class="col-xs-12 col-md-2 q-pa-xs">
            <q-input
              autofocus
              dense
              disable
              filled
              v-model="facturaVenta"
              label="Factura"
            />
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs">
            <q-input
              autofocus
              dense
              filled
              v-model="cliente"
              label="Cliente"
            />
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs">
            <q-input
              autofocus
              dense
              filled
              v-model="placa"
              label="Placa"
            />
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs">
            <q-input
              autofocus
              dense
              filled
              v-model="operacion"
              label="Operación"
            />
          </div>
          <div class="col-xs-12 col-md-1 q-pa-xs">
            <q-btn color="primary" @click="buscarProductos" label="Buscar" />
          </div>
        </div>
      </q-card>
    </div>
    <div class="col-xs-12 col-md-12 q-pa-xs">
      <div class="row">
        <div class="col"><u>Lista de Operaciones</u></div>
        <div class="col text-right q-pa-xs">
          <!--          <q-btn size="8px" color="primary" label="Agregar" />-->
        </div>
      </div>
      <q-card flat bordered>
        <!--        {{ get_listar_produc_encont }}-->
        <q-table
          color="primary"
          card-class="bg-amber-1 text-brown"
          table-class="text-grey-8"
          table-header-class="text-brown"
          :pagination="initialPagination"
          virtual-scroll
          class="my-sticky-header-table-v2"
          dense
          :data="get_listar_operac_encont.operac"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-accion="props">
            <q-td :props="props">
              <q-btn
                color="primary"
                size="sm"
                @click="agregar(props.row)"
                dense
                label="agregar"
              />
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "TablaDetallesdelaFactura",
  computed: {
    ...mapState("facturas", ["facturaVenta"]),
    ...mapGetters("facturas", ["get_listar_operac_encont"])
  },
  data() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      model: null,
      oc: "",
      categoria: "",
      subcategoria: "",
      producto: "",
      cliente:"",
      placa:"",
      operacion:"",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        {
          name: "name",
          required: true,
          label: "Documento",
          align: "left",
          field: row => row.co_factur,
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
        { name: "co_operac", label: "Operacion", field: "co_operac" },
        { name: "no_client", label: "Cliente", field: "no_client" },
        { name: "accion", label: "Accion", field: "accion" }
      ],

      data: []
    };
  },
  methods: {
    ...mapActions("facturas", [
      "call_listar_operac_encont",
      "call_manten_detall_factur",
      "call_listar_detall_factur"
    ]),
    async agregar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_manten_detall_factur({
        co_factur: val.co_factur,
        co_operac: val.co_operac,
        ti_accion: "I"
      });
      console.log("buscar - aagregar");
      await this.buscarProductos();
      await this.call_listar_detall_factur({
        co_factur: `${val.co_factur}`
      });
      this.$q.loading.hide();
    },
    async buscarProductos() {
      await this.call_listar_produc_encont({
        co_factur: this.facturaVenta,
        no_client: this.cliente,
        co_plaveh: this.placa,
        co_operac: this.operacion
      });
    }
  }
};
</script>

<style scoped></style>
