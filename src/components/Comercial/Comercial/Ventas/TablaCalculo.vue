<template>
  <div>
    <!--    {{ get_listar_detall_tradoc }}-->
    <div class="row">
      <div class="col"><u>Resultado</u></div>
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
        :data="get_resultado_calculo.resultado"
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
  name: "TablaCalculo",
  computed: {
    ...mapState("comercial", ["dialogOperacion"]),
    ...mapGetters("personas", ["getPersonasFilter"]),
    ...mapGetters("comercial", [
        "get_inform_vehicu", 
        "get_catalogo_tctipveh", 
        "get_catalogo_tctipdct",
        "get_resultado_calculo"
        ]
      ),
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
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        { name: "no_moneda", align: "left", label: "Moneda", field: "no_moneda", sortable: true },
        { name: "va_tipcam", align: "center", label: "T.C", field: "va_tipcam", sortable: true },
        { name: "im_preveh", align: "center", label: "P. Vehiculo (A)", field: "im_preveh" },
        { name: "no_dctven", align: "left", label: "T.DPV", field: "no_dctven" },
        { name: "va_desven", align: "center", label: "V.D", field: "va_desven" },
        { name: "im_descue", align: "center", label: "Descuento (B)", field: "im_descue" },
        { name: "im_preven", align: "center", label: "Precio Venta (C=A-B)", field: "im_preven" },
        { name: "no_dctini", align: "left", label: "T.C.I", field: "no_dctini" },
        { name: "va_cuoini", align: "center", label: "V.C.I", field: "va_cuoini" },
        { name: "im_cuoini", align: "center", label: "C.I (D)", field: "im_cuoini" },
        { name: "im_prefin", align: "center", label: "Saldo (C-D)", field: "im_prefin" },
        
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("comercial", [
        "call_inform_vehicu", 
        "call_listar_vehicu", 
        "call_insert_operac_venta", 
        "call_catalogo_tctipdct",
        "call_resultado_calculo"
        ]
      ),
    
  }
};
</script>

<style scoped></style>
