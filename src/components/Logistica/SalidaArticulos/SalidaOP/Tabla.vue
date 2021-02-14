<template>
  <div class="q-pa-md">
    <q-table
      color="primary"
      dense
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
      title="Artículos a ingresar"
      :data="info"
      :filter="filter"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top-right>
        <div class="row">
          <div class="q-pa-xs">
            <q-btn color="primary" label="Despachar" @click="ingresar" />
          </div>
          <div class="q-pa-xs">
            <q-input
              filled
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template v-slot:body-cell-il_selecc="props">
        <q-td class="text-center" :props="props">
          <div v-if="!props.row.il_selecc">
            <q-checkbox size="30px" val="true" v-model="props.row.il_selecc" />
          </div>
          <div v-else-if="props.row.il_selecc == true">
            <q-checkbox size="30px" val="true" color="green" v-model="props.row.il_selecc" />
          </div>
          <div v-else>
            {{ props.row.il_selecc }}
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog
      v-model="dialogSalidaOP"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-up"
      full-height
      full-width
    >
      <DialogSalidaOP />
    </q-dialog>
  </div>
</template>

<script>
import { date } from "quasar";
let timeStamp = Date.now();
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapState("almacen", ["dialogSalidaOP"])
  },
  components: {
    DialogSalidaOP: () => import("./TablaB")
  },
  data() {
    return {
      maximizedToggle: false,
      filter: "",
      initialPagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha OP",
          align: "left",
          field: row => row.fe_regist,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_docide",
          align: "center",
          label: "Ruc",
          field: "co_docide",
          sortable: true
        },
        {
          name: "no_client",
          label: "Proveedor",
          field: "no_client",
          sortable: true
        },
        { name: "no_operac", label: "Operacion", field: "no_operac" },
        { name: "co_plaveh", label: "Placa", field: "co_plaveh" },
        { name: "no_marveh", label: "Marca", field: "no_marveh" },
        {
          name: "co_barras",
          label: "Codigo",
          field: "co_barras",
          sortable: true
        },
        {
          name: "no_articu",
          label: "Nombre",
          field: "no_articu",
          sortable: true
        },
        {
          name: "ca_articu",
          label: "Cant. Articulos",
          field: "ca_articu",
          sortable: true
        },
        {
          name: "ca_stocks",
          label: "Stock",
          field: "ca_stocks",
          sortable: true
        },
        {
          name: "ti_estado",
          label: "Estado",
          field: "ti_estado",
          sortable: true
        },
        {
          name: "il_selecc",
          label: "Check",
          field: "il_selecc",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("almacen", [
      "call_insert_produc_ingsal",
      "call_listar_docume_agrega_ingsal",
      "call_listar_produc_agrega_ingsal"
    ]),
    async ingresar() {
      this.$q.loading.show();
      console.log("ingresar");
      try {
        for (let i = 0; i < this.info.length; i++) {
          const element = this.info[i];
          // console.log("element", element);
          if (element.il_selecc === true) {
            console.log("element", element);
            await this.call_insert_produc_ingsal({
              co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
              fe_regist: date.formatDate(timeStamp, "YYYY-MM-DD"),
              co_prikey: element.co_operac,
              co_articu: element.co_articu,
              ca_articu: element.ca_articu,
              il_unineg: "OP",
              ti_ingsal: "2"
            });
          }
        }
        await this.call_listar_docume_agrega_ingsal({
          fe_regist: date.formatDate(timeStamp, "YYYY-MM-DD"),
          co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
          il_unineg: "OP",
          ti_ingsal: "2"
        });
        await this.call_listar_produc_agrega_ingsal({
          fe_regist: date.formatDate(timeStamp, "YYYY-MM-DD"),
          co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
          il_unineg: "OP",
          ti_ingsal: "2"
        });
        this.$store.commit("almacen/dialogSalidaOP", true);
        this.$q.loading.hide();
      } catch (e) {
        console.log(e);
        this.$q.loading.hide();
      }
    }
  }
};
</script>

<style scoped></style>
