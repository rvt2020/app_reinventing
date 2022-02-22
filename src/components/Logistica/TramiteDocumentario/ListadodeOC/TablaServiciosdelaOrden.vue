<template>
  <div>
    <!--    {{ get_listar_detall_tradoc }}-->
    <div class="row">
      <div class="col"><u>Servicios del Trámite </u></div>
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
        :data="get_listar_detall_servic_tradoc.operac"
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
  name: "TablaServiciosdelaOrden",
  computed: {
    ...mapState("tramites", ["tramiteDoc"]),
    ...mapGetters("tramites", [
        "get_listar_detall_tradoc", 
        "get_listar_detall_servic_tradoc",
        "get_listar_servic_encont",
        "get_listar_produc_encont"
        ])
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
      operacion: "",
      placa: "",
      cliente: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "T/D",
          align: "center",
          field: row => row.co_tradoc,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_operac",
          align: "center",
          label: "OP",
          field: "co_operac",
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
          name: "no_client",
          align: "left",
          label: "Cliente",
          field: "no_client"
        },
        {
          name: "co_opeser",
          align: "center",
          label: "OS",
          field: "co_opeser"
        },
        {
          name: "de_servic",
          align: "left",
          label: "Trabajo",
          field: "de_servic"
        },
        {
          name: "accion",
          label: "",
          field: "accion",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("tramites", [
      "call_listar_produc_encont",
      "call_listar_servic_encont",
      "call_listar_detall_tradoc",
      "call_listar_detall_servic_tradoc",

      "call_manten_produc_tradoc",
      "call_manten_servic_tradoc"
    ]),
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_manten_servic_tradoc({
        co_tradoc: val.co_tradoc,
        co_opeser: val.co_opeser,
        ti_accion: "D"
      });

      console.log("buscar - eliminar");
      
      await this.call_listar_produc_encont({
        co_tradoc: val.co_tradoc,
        co_catego: this.categoria,
        co_subcat: this.subcategoria,
        no_produc: this.producto
      });
      
      await this.call_listar_servic_encont({
        co_tradoc: this.tramiteDoc,
        co_operac: this.operacion,
        co_plaveh: this.placa,
        no_client: this.cliente
      });
      
      await this.call_listar_detall_tradoc({
        co_tradoc: `${val.co_tradoc}`
      });
      
      await this.call_listar_detall_servic_tradoc({
        co_tradoc: `${val.co_tradoc}`
      });
      this.$q.loading.hide();

    }/*,
    async buscarProductos() {
      await this.call_listar_produc_encont({
        co_tradoc: this.tramiteDoc,
        co_catego: this.categoria,
        co_subcat: this.subcategoria,
        no_produc: this.producto
      });


    },
    async buscarServicios() {
      await this.call_listar_servic_encont({
        co_tradoc: this.tramiteDoc,
        co_operac: this.operacion,
        co_plaveh: this.placa,
        no_client: this.cliente
      });
    }*/
  }
};
</script>

<style scoped></style>
