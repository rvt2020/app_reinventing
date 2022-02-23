<template>
  <div class="row">
    <div class="col-xs-12 col-md-12 q-pa-xs">
      <!--      {{ get_listar_produc_encont }}-->
      <div class="col"><u>Filtro Repuestos / Servicios </u></div>
        <q-card flat bordered>
          <div class="row">
          <div class="col-xs-12 col-md-2 q-pa-xs">
            <q-input
              autofocus
              dense
              disable
              filled
              v-model="tramiteDoc"
              label="T/D"
            />
          </div>
          <div class="col-xs-12 col-md-8 q-pa-xs">
            <q-input
              autofocus
              dense
              filled
              v-model="producto"
              label="Producto"
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
        <div class="col"><u>Repuestos / Servicios Encontrados </u></div>
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
          :data="get_listar_produc_encont.operac"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-cantidad="props">
            <q-td :props="props">
              <q-input
                filled
                input-class="text-right"
                v-model="props.row.cantidad"
                dense
                size="5"
              />
            </q-td>
          </template>
          <!--
          <template v-slot:body-cell-co_operac="props">
            <q-td :props="props">
              <q-input
                filled
                input-class="text-right"
                v-model="props.row.co_operac"
                dense
                size="5"
              />
            </q-td>
          </template>
          -->
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
  name: "TablaProductosdelaOrden",
  computed: {
    ...mapState("tramites", ["tramiteDoc"]),
    ...mapGetters("tramites", [
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
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        {
          name: "name",
          required: true,
          label: "T/D",
          align: "left",
          field: row => row.co_tradoc,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "no_catego",
          align: "left",
          label: "Categoría",
          field: "no_catego",
          sortable: true
        },
        {
          name: "no_subcat",
          align: "left",
          label: "Sub Categoría",
          field: "no_subcat",
          sortable: true
        },
        { 
          name: "no_produc", 
          align: "left",
          label: "Producto", 
          field: "no_produc" 
        },
        { 
          name: "cantidad", 
          label: "Cantidad", 
          field: "cantidad",
          align: "right"
        },
        /*{ 
          name: "co_operac", 
          label: "Operación", 
          field: "co_operac",
          align: "right"
        },*/
        { 
          name: "accion", 
          label: "", 
          field: "accion" }
      ],

      data: []
    };
  }, 
  methods: {
    ...mapActions("tramites", [
      "call_manten_produc_tradoc",
      "call_manten_servic_tradoc",
      "call_listar_detall_tradoc",
      "call_listar_detall_servic_tradoc",
      "call_listar_servic_encont",
      "call_listar_produc_encont"

    ]),
    async agregar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_manten_produc_tradoc({
        co_tradoc: val.co_tradoc,
        co_articu: val.co_produc,
        ca_articu: val.cantidad,
        co_moneda: 28,
        im_preuni: 0,
        ti_accion: "I"
      });
      console.log("buscar - aagregar");
      await this.buscarProductos();
      
      await this.call_listar_detall_tradoc({
        co_tradoc: `${val.co_tradoc}`
      });
      this.$q.loading.hide();

      await this.call_listar_detall_servic_tradoc({
        co_tradoc: `${val.co_tradoc}`
      });
      this.$q.loading.hide();
    },
    async buscarProductos() {
      await this.call_listar_produc_encont({
        co_tradoc: this.tramiteDoc,
        co_catego: this.categoria,
        co_subcat: this.subcategoria,
        no_produc: this.producto
      });
    }
  }
};
</script>

<style scoped></style>
