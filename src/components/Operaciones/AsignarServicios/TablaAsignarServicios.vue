<template>
  <div>
    <!-- {{info}} -->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Listado"
      :data="info"
      dense
      :filter="filter"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
    >
      <template v-slot:top-right>
        <q-input dense filled debounce="300" v-model="filter" placeholder="Buscar">
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
    </q-table>
    <q-dialog
      v-model="operacionesid4"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
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
      type: Array,
    },
  },
  computed: {
    ...mapState("operaciones", ["operacionesid4"]),
    ...mapGetters("operaciones", ["get_lista_sermat_asignar"]),
  },
  components: {
    DialogGenerarOperacion: () => import("./DialogAsignarServicios"),
  },
  data() {
    return {
      filter: "",
      maximizedToggle: false,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha de Registro",
          align: "left",
          field: (row) => row.fe_regist,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "no_usuari",
          align: "center",
          label: "Usuario",
          field: "no_usuari",
          sortable: true,
        },
        {
          name: "no_operac",
          label: "Operacion",
          field: "no_operac",
          sortable: true,
        },
        { name: "no_client", label: "Cliente", field: "no_client" },
        { name: "no_placas", label: "Placa", field: "no_placas" },
        { name: "no_marveh", label: "Marca", field: "no_marveh" },
        {
          name: "no_modveh",
          label: "Modelo",
          field: "no_modveh",
          sortable: true,
        },
        {
          name: "no_verveh",
          label: "Version",
          field: "no_verveh",
          sortable: true,
        },
        {
          name: "no_anoveh",
          label: "Año",
          field: "no_anoveh",
          sortable: true,
        },
        {
          name: "no_colveh",
          label: "Color",
          field: "no_colveh",
          sortable: true,
        },
        {
          name: "no_estado",
          label: "Estado",
          field: "no_estado",
          sortable: true,
        },
        // {
        //   name: "accion",
        //   label: "Accion",
        //   field: "accion",
        //   sortable: true,
        // },
      ],
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_combo_cliente",
      "call_lista_vehiculo_ingreso",
      "call_nueva_operacion",
      "call_lista_sermat_evalua",
      "call_lista_sermat_asignar",
      "call_combo_tecnico",
    ]),
    async generarOperacion(val) {
      this.$q.loading.show();
      await this.call_lista_sermat_asignar(val.co_operac);
      // await this.call_combo_cliente();
      // await this.call_lista_vehiculo_ingreso(val.co_aduana);
      console.log(val);
      this.$q.notify({
        message: `${val.co_operac}`,
      });
      this.$store.commit("operaciones/operacionesid4", true);
      this.$q.loading.hide();
    },
  },
  async created() {
    await this.call_combo_tecnico();
  },
};
</script>
