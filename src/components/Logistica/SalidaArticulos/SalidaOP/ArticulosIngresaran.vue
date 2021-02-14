<template>
  <div>
    <q-table
      dense
      flat
      bordered
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
      title="Artículos a despachar"
      :data="info"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              dense
              round
              size="sm"
              color="red"
              @click="borrar(props.row)"
              icon="delete"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { date } from "quasar";
let timeStamp = Date.now();
export default {
  props: ["info"],
  data() {
    return {
      initialPagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 1000
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Fe_ordcom",
          align: "left",
          field: row => row.fe_docume,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_procli",
          align: "center",
          label: "Co_docide",
          field: "co_procli",
          sortable: true
        },
        {
          name: "no_procli",
          label: "No_razsoc",
          field: "no_procli",
          sortable: true
        },
        { name: "no_prikey", label: "No_ordcom", field: "no_prikey" },
        { name: "co_barras", label: "Co_barras", field: "co_barras" },
        { name: "no_articu", label: "No_articu", field: "no_articu" },
        {
          name: "co_unimed",
          label: "Co_unimed",
          field: "co_unimed",
          sortable: true
        },
        {
          name: "ca_articu",
          label: "Ca_articu",
          field: "ca_articu",
          sortable: true
        },
        {
          name: "ca_ingsal",
          label: "Ca_ingres",
          field: "ca_ingsal",
          sortable: true
        },
        {
          name: "ca_pendie",
          label: "Ca_pendie",
          field: "ca_pendie",
          sortable: true
        },
        {
          name: "action",
          label: "Accion",
          field: "action",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("almacen", [
      "call_quitar_produc_agrega_ingsal",
      "call_listar_produc_agrega_ingsal"
    ]),
    async borrar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_quitar_produc_agrega_ingsal({
        co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
        fe_regist: date.formatDate(timeStamp, "YYYY-MM-DD"),
        co_prikey: val.co_prikey,
        co_articu: val.co_articu,
        ca_articu: val.ca_articu,
        il_unineg: "OP",
        ti_ingsal: "2"
      });
      await this.call_listar_produc_agrega_ingsal({
        fe_regist: date.formatDate(timeStamp, "YYYY-MM-DD"),
        co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
        il_unineg: "OP",
        ti_ingsal: "2"
      });
      this.$q.notify({
        message: "Se elimino correctamnete"
      });
      this.$q.loading.hide();
    }
  }
};
</script>
