<template>
  <div>
    <!-- {{info}} -->
    <!--    {{get_listar_pendie_visado_gerencia}}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Lista de Órdenes"
      :data="get_listar_pendie_visado_gerencia.operac"
      dense
      :filter="filter"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
    >
      <template v-slot:top-right>
        <q-btn color="primary" @click="confirmar" label="Confirmar"></q-btn>
        <q-input
          class="q-pl-sm"
          dense
          filled
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </template>
      <template v-slot:body-cell-no_operac="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="primary"
            :label="`${props.row.no_operac}`"
            @click="generarOperacion(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-visar="props">
        <q-td :props="props">
          <q-checkbox
            v-model="props.row.visar"
            color="secondary"
            true-value="v"
            false-value="r"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <div class="row">
            <div class="col">
              <q-btn
                size="xs"
                color="primary"
                icon="map"
                @click="generarOperacionVisado(props.row)"
              />
            </div>
            <div class="col">
              <q-btn size="xs" color="primary" icon="delete" />
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog
      v-model="dialogDetalleOrden"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-up"
      full-height
      full-width
    >
      <DialogGenerarOperacion />
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
    info: {
      type: Array
    }
  },
  computed: {
    ...mapState("logisticas", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("logisticas", ["get_listar_pendie_visado_gerencia"])
  },
  components: {
    DialogGenerarOperacion: () => import("./DialogDetalleOrden"),
    DialogCrear: () => import("./NuevaOC")
  },
  data() {
    return {
      tipo: 1,
      dataEdit: [],
      filter: "",
      maximizedToggle: false,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha",
          align: "left",
          field: row => row.fe_ordcom,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_rucpro",
          align: "center",
          label: "Ruc",
          field: "co_rucpro",
          sortable: true
        },
        {
          name: "no_razsoc",
          label: "Proveedor",
          field: "no_razsoc",
          sortable: true
        },
        { name: "no_ordcom", label: "Orden Compra", field: "no_ordcom" },
        { name: "co_moneda", label: "Moneda", field: "co_moneda" },
        {
          name: "im_prenet",
          label: "Precio Neto",
          field: "im_prenet",
          sortable: true
        },
        {
          name: "im_pretot",
          label: "Precio Total",
          field: "im_pretot",
          sortable: true
        },
        {
          name: "visar",
          label: "¿Visar?",
          field: "visar",
          sortable: true
        },
        {
          name: "accion",
          label: "Accion",
          field: "accion",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("logisticas", [
      "call_visrec_ordcom",
      "call_listar_pendie_visado_gerencia",
      "call_inform_ordcom",
      "call_listar_produc_encont",
      "call_listar_detall_ordcom",
      "call_delete_ordcom",
      "call_listar_ordcom",
      "call_insert_arcadj",
      "call_listar_arcadj_ordcom"
    ]),

    async confirmar() {
      this.$q.loading.show();
      const array = this.get_listar_pendie_visado_gerencia.operac;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        await this.call_visrec_ordcom({
          co_ordcom: element.co_ordcom,
          co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
          ti_person: "G",
          ti_visado: element.visar
        });
      }
      await this.call_listar_pendie_visado_gerencia({
        co_ordcom: "",
        co_tipvis: "J"
      });
      this.$q.loading.hide();
    },
    async crearOC() {
      console.log("Crear O/C");
      this.$store.commit("logisticas/dialogCrear", true);
    },
    async generarOperacionVisado(val) {
      console.log("asdaasd");
      this.$q.loading.show();
      this.$store.commit("logisticas/ordenCompra", val.co_ordcom);
      await this.call_inform_ordcom({
        co_ordcom: `${val.co_ordcom}`
      });
      await this.call_listar_produc_encont({
        co_ordcom: `${val.co_ordcom}`,
        co_catego: "",
        co_subcat: "",
        no_produc: ""
      });
      await this.call_listar_detall_ordcom({
        co_ordcom: `${val.co_ordcom}`
      });
      // await this.call_combo_cliente();
      // await this.call_lista_vehiculo_ingreso(val.co_aduana);
      console.log(val);
      this.$q.notify({
        message: `${val.co_ordcom}`
      });
      this.$store.commit("logisticas/dialogDetalleOrden", true);
      this.$q.loading.hide();
    },
    async generarOperacion(val) {
      this.$q.loading.show();
      await this.call_lista_sermat_asignar(val.co_operac);
      // await this.call_combo_cliente();
      // await this.call_lista_vehiculo_ingreso(val.co_aduana);
      console.log(val);
      this.$q.notify({
        message: `${val.co_operac}`
      });
      this.$store.commit("operaciones/operacionesid4", true);
      this.$q.loading.hide();
    }
  },
  async created() {
    // await this.call_combo_tecnico();
  }
};
</script>
