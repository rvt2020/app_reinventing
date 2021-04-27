<template>
  <div>
    <!--    {{ get_listar_detall_ordcom }}-->
    <div class="row">
      <div class="col"><u>Productos de Factura </u></div>
      <div class="col text-right q-pa-xs">
        <!--<q-btn
          size="8px"
          color="primary"
          @click="acrtualizar"
          label="Actualizar"
        />-->
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
      </q-table>
    </q-card>
  </div>
</template>
 
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "TablaProductosdelaOrden",
  computed: {
    ...mapState("finanzas", ["documentoVenta"]),
    ...mapGetters("finanzas", ["get_listar_detall_factur", "get_listar_amorti_factur"])
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
      cliente: "",
      placa: "",
      operacion: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        {
          name: "name",
          required: true,
          label: "Código",
          align: "left",
          field: row => row.co_factur,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_facdet",
          align: "left",
          label: "ID",
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
          align: "right",
          label: "Cantidad",
          field: "va_cantid"
        },
        {
          name: "im_preuni",
          align: "right",
          label: "Precio U.",
          field: "im_preuni"
        },
        {
          name: "im_basimp",
          align: "right",
          label: "Precio T.",
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
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("finanzas", [
      "call_listar_operac_encont",
      "call_manten_produc_factur",
      "call_listar_detall_factur",
      "call_delete_detalle_factur",
      "call_inform_factur",
      "call_listar_amorti_factur"
    ]),
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_delete_detalle_factur({
        co_facdet: val.co_facdet
      });
      await this.call_inform_factur({
        co_factur: `${val.co_factur}`
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
      await this.call_listar_amorti_factur({
        co_factur: `${val.co_factur}`
      });
      this.$q.loading.hide();
    },
    async acrtualizar() {
      this.$q.loading.show();
      const array = this.get_listar_detall_factur.operac;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log(element);
        await this.call_manten_produc_factur({
          co_factur: element.co_factur,
          co_operac: element.co_operac,
          ti_accion: "U"
        });
      }
      await this.call_listar_operac_encont({
        co_factur: val.co_factur,
        no_client: this.cliente,
        co_plaveh: this.placa,
        co_operac: this.operacion
      });
      await this.call_listar_detall_factur({
        co_factur: this.documentoVenta,
      });
      this.$q.loading.hide();
    },
    async buscarProductos() {
      await this.call_listar_operac_encont({
        co_factur: this.documentoVenta,
        no_client: this.cliente,
        co_plaveh: this.placa,
        co_operac: this.operacion
      });
    }
  }
};
</script>

<style scoped></style>
