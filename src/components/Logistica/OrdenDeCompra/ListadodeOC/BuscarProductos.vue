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
              v-model="ordenCompra"
              label="O/C"
            />
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs">
            <q-select
              filled
              dense
              v-model="categoria"
              :options="options"
              label="Categoría"
            />
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs">
            <q-select
              filled
              dense
              v-model="subcategoria"
              :options="options"
              label="Subcategoria"
            />
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs">
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
        <div class="col"><u>Productos Encontrados </u></div>
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
          <template v-slot:body-cell-descripcion="props">
            <q-td :props="props">
              <q-input
                filled
                input-class="text-left"
                v-model="props.row.descripcion"
                dense
                size="50"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-cantidad="props">
            <q-td :props="props">
              <q-input
                filled
                input-class="text-right"
                v-model="props.row.cantidad"
                dense
                size="4"
              />
            </q-td>
          </template>
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
    ...mapState("logisticas", ["ordenCompra"]),
    ...mapGetters("logisticas", ["get_listar_produc_encont"])
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
          label: "O/C",
          align: "left",
          field: row => row.co_ordcom,
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
          name: "co_barpro", 
          align: "center",
          label: "Código", 
          field: "co_barpro" 
        },
        { 
          name: "no_produc", 
          align: "left",
          label: "Producto", 
          field: "no_produc" 
        },
        { 
          name: "descripcion", 
          align: "left",
          label: "Descripción / Comentario", 
          field: "descripcion" 
        },
        { 
          name: "cantidad", 
          align: "right",
          label: "Cantidad", 
          field: "cantidad" 
        },
        { name: "accion", label: "", field: "accion" }
      ],

      data: []
    };
  },
  methods: {
    ...mapActions("logisticas", [
      "call_listar_produc_encont",
      "call_manten_produc_ordcom",
      "call_listar_detall_ordcom"
    ]),
    async agregar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_manten_produc_ordcom({
        co_ordcom: val.co_ordcom,
        co_articu: val.co_produc,
        ca_articu: val.cantidad,
        co_moneda: 28,
        im_preuni: 0,
        no_descri: val.descripcion,
        ti_accion: "I"
      });
      console.log("buscar - aagregar");
      await this.buscarProductos();
      await this.call_listar_detall_ordcom({
        co_ordcom: `${val.co_ordcom}`
      });
      this.$q.loading.hide();
    },
    async buscarProductos() {
      await this.call_listar_produc_encont({
        co_ordcom: this.ordenCompra,
        co_catego: this.categoria,
        co_subcat: this.subcategoria,
        no_produc: this.producto
      });
    }
  }
};
</script>

<style scoped></style>
