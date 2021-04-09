<template>
  <div>
    <!--    {{ get_listar_detall_tradoc }}-->
    <div class="row">
      <div class="col"><u>Detalles de la Factura </u></div>
      <div class="col text-right q-pa-xs">
        <q-btn
          size="8px"
          color="primary"
          @click="acrtualizar"
          label="Actualizar"
        />
      </div>
    </div>
    <q-card flat bordered>
      <q-table
        color="primary"
        card-class="bg-amber-1 text-brown"
        table-class="text-grey-8"
        table-header-class="text-brown"
        :pagination="initialPagination"
        virtual-scroll
        class="my-sticky-header-table-v2"
        dense
        :data="get_listar_detall_factur.operac"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-accion="props">
          <q-td :props="props">
            <q-btn
              class="q-pa-sm"
              color="red"
              size="xs"
              icon="delete"
              @click="eliminar(props.row)"
              dense
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "TablaDetallesdelaFactura",
  computed: {
    ...mapState("facturas", ["facturaVenta"]),
    ...mapGetters("facturas", ["get_listar_detall_factur"])
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
      placa: "",
      cliente: "",
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
          name: "co_facdet",
          align: "left",
          label: "Código",
          field: "co_facdet",
          sortable: true
        },
        {
          name: "no_descri",
          align: "left",
          label: "Descripción",
          field: "no_descri",
          sortable: true
        },
        {
          name: "va_cantid",
          align: "left",
          label: "Cantidad",
          field: "va_cantid"
        },
        {
          name: "im_preuni",
          align: "left",
          label: "Precio U.",
          field: "im_preuni"
        },
        {
          name: "im_basimp",
          align: "left",
          label: "Precio T.",
          field: "im_basimp"
        },
        {
          name: "accion",
          label: "Acciones",
          field: "accion",
          sortable: true
        }
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
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_manten_detall_factur({
        co_factur: val.co_factur,
        co_operac: val.co_operac,
        ti_accion: "D"
      });
      console.log("buscar - eliminar");
      await this.call_listar_operac_encont({
        co_factur: val.co_factur,
        no_client: this.cliente,
        co_plaveh: this.placa,
        co_operac: this.operacion
      });
      await this.call_listar_detall_factur({
        co_factur: `${val.co_factur}`
      });
      this.$q.loading.hide();
    },
    async buscarProductos() {
      await this.call_listar_operac_encont({
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
