<template>
  <div>
    <!--    {{ get_listar_detall_tradoc }}-->
    <div class="row">
      <div class="col"><u>Productos del Tramite </u></div>
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
        :data="get_listar_detall_tradoc.operac"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-ca_articu="props">
          <q-td :props="props">
            <q-input
              filled
              input-class="text-right"
              v-model="props.row.ca_articu"
              dense
            />
          </q-td>
        </template>
        <template v-slot:body-cell-im_preuni="props">
          <q-td :props="props">
            <q-input
              filled
              input-class="text-right"
              v-model="props.row.im_preuni"
              dense
            />
          </q-td>
        </template>
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
  name: "TablaProductosdelaOrden",
  computed: {
    ...mapState("tramites", ["tramiteDoc"]),
    ...mapGetters("tramites", ["get_listar_detall_tradoc"])
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
          field: row => row.co_tradoc,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_articu",
          align: "left",
          label: "Código",
          field: "co_articu",
          sortable: true
        },
        {
          name: "no_articu",
          align: "left",
          label: "Producto",
          field: "no_articu",
          sortable: true
        },
        {
          name: "ca_articu",
          align: "left",
          label: "Cantidad",
          field: "ca_articu"
        },
        {
          name: "im_preuni",
          align: "left",
          label: "Precio U.",
          field: "im_preuni"
        },
        {
          name: "im_pretot",
          align: "left",
          label: "Precio T.",
          field: "im_pretot"
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
    ...mapActions("tramites", [
      "call_listar_produc_encont",
      "call_manten_produc_tradoc",
      "call_listar_detall_tradoc"
    ]),
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_manten_produc_tradoc({
        co_tradoc: val.co_tradoc,
        co_articu: val.co_articu,
        ca_articu: 0,
        co_moneda: 28,
        im_preuni: 0,
        ti_accion: "D"
      });
      console.log("buscar - eliminar");
      await this.call_listar_produc_encont({
        co_tradoc: val.co_tradoc,
        co_catego: this.categoria,
        co_subcat: this.subcategoria,
        no_produc: this.producto
      });
      await this.call_listar_detall_tradoc({
        co_tradoc: `${val.co_tradoc}`
      });
      this.$q.loading.hide();
    },
    async acrtualizar() {
      this.$q.loading.show();
      const array = this.get_listar_detall_tradoc.operac;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log(element);
        await this.call_manten_produc_tradoc({
          co_tradoc: element.co_tradoc,
          co_articu: element.co_articu,
          ca_articu: element.ca_articu,
          co_moneda: 28,
          im_preuni: element.im_preuni,
          ti_accion: "U"
        });
      }
      await this.call_listar_produc_encont({
        co_tradoc: this.tramiteDoc,
        co_catego: this.categoria,
        co_subcat: this.subcategoria,
        no_produc: this.producto
      });
      await this.call_listar_detall_tradoc({
        co_tradoc: `${this.tramiteDoc}`
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
