<template>
  <div>
    <!--    {{ get_listar_detall_ordcom }}-->
    <div class="row">
      <div class="col"><u>Características del Vehículo </u></div>
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
        :data="get_listar_caract_vehicu.operac"
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
  name: "TablaCaracteristicaVehiculo",
  computed: {
    ...mapState("finanzas", ["documentoVenta"]),
    ...mapGetters("finanzas", ["get_listar_detall_factur"]),
    ...mapGetters("finanzas", ["get_listar_operac_factur"]),
    ...mapGetters("finanzas", ["get_listar_caract_vehicu"])
    
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
          name: "id_operac",
          align: "center",
          label: "Operación",
          field: "id_operac",
          sortable: true
        },
        {
          name: "no_caract",
          align: "left",
          label: "Característica del Vehículo",
          field: "no_caract",
          sortable: true
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
      "call_listar_operac_factur",
      "call_listar_caract_vehicu"
    ]),
    async buscarProductos() {
      await this.call_listar_operac_factur({
        co_factur: this.documentoVenta,
      });
    }
  }
};
</script>

<style scoped></style>
