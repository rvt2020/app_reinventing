<template>
  <div>
    <!--    {{ get_listar_detall_ordcom }}-->
    <div class="row">
      <div class="col"><u>Pagos </u></div>
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
        :data="get_listar_amorti_factur.operac"
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
  name: "TablaAmortizacion",
  computed: {
    ...mapState("finanzas", ["documentoVenta"]),
    ...mapGetters("finanzas", ["get_listar_amorti_factur", "get_listar_detall_factur"])
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
          name: "co_amorti",
          align: "left",
          label: "ID",
          field: "co_amorti",
          sortable: true
        },
        {
          name: "no_person",
          align: "left",
          label: "Usuario",
          field: "no_person",
          sortable: true
        },
        {
          name: "fe_amorti",
          align: "center",
          label: "Fecha",
          field: "fe_amorti"
        },
        {
          name: "im_amorti",
          align: "right",
          label: "Pago",
          field: "im_amorti"
        },
        {
          name: "im_detrac",
          align: "right",
          label: "Detracción",
          field: "im_detrac"
        },
        {
          name: "no_entfin",
          align: "left",
          label: "Entidad Financiera",
          field: "no_entfin"
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("finanzas", [
      "call_listar_detall_factur",
      "call_inform_factur",
      "call_listar_amorti_factur"
    ]),
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_listar_amorti_factur({
        co_factur: `${val.co_factur}`
      });
      this.$q.loading.hide();
    },
    async buscarProductos() {
      await this.call_listar_amorti_factur({
        co_factur: this.documentoVenta
      });
    }
    
  }
};
</script>

<style scoped></style>
