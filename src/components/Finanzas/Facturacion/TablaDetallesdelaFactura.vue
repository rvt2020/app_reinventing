<template>
  <div>
    <!--    {{ get_listar_detall_ordcom }}-->
    <div class="row">
      <div class="col"><u>Detalle del Documento </u></div>
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
    ...mapState("finanzas", ["factura"]),
    ...mapGetters("finanzas", ["get_listar_detall_factur"])
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
      operacion: "",
      placa: "",
      cliente: "",
      
      categoria: "",
      subcategoria: "",
      producto: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        {
          name: "name",
          required: true,
          label: "Codigo",
          align: "left",
          field: row => row.co_factur,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_facdet",
          align: "left",
          label: "Detalle",
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
          name: "im_basimp",
          align: "right",
          label: "Precio U.",
          field: "im_basimp"
        },
        {
          name: "im_impigv",
          align: "right",
          label: "IGV",
          field: "im_impigv"
        },
        {
          name: "im_totfac",
          align: "right",
          label: "Total",
          field: "im_totfac"
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
    ...mapActions("finanzas", [
      "call_listar_operac_encont",
      "call_manten_detall_factur_operac",
      "call_listar_detall_factur"
    ]),
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_manten_detall_factur_operac({
        co_factur: info.operac[0].co_factur, //val.co_factur,
        co_operac: val.co_operac,
        ti_accion: "D"
      });
      console.log("buscar - eliminar");
      await this.call_listar_operac_encont({
        co_factur: info.operac[0].co_factur, //val.co_factur,
        co_operac: this.operacion,
        co_plaveh: this.placa,
        no_client: this.cliente
      });
      await this.call_listar_detall_factur({
        co_factur: info.operac[0].co_factur// `${val.co_factur}`
      });
      this.$q.loading.hide();
    },
    
    async buscarProductos() {
      await this.call_listar_operac_encont({
        co_factur: info.operac[0].co_factur,//this.factura,
        co_operac: this.operacion,
        co_plaveh: this.placa,
        no_client: this.cliente

      });
    }
  }
};
</script>

<style scoped></style>
