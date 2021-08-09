<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Lista de Vehiculos"
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

      <template v-slot:body-cell-co_plaveh="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="primary"
            :label="`${props.row.co_plaveh}`"
            @click="generarOperacion(props.row)"
          />
        </q-td>
      </template>
    
    </q-table>
    
    <q-dialog
      v-model="dialogOperacion"
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
import { MixinDefault } from "../../../../mixins/mixin";
import { date } from "quasar";
let timeStamp = Date.now();

export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [MixinDefault],
  name: "Tabla",
  computed: {
    ...mapState("comercial", ["dialogOperacion"]),
    ...mapGetters("comercial", ["get_inform_vehicu"])
  },
  //SUPUESTAMENTE AQUI VA COMPONENT
  components: {
    DialogGenerarOperacion: () => import("./DialogOperacion")
    //Upload: () => import("./Upload")
  },
  data() {
    return {
      arcadjs: "",
      visor: false,
      data_visor: "",
      upload: false,
      filter: "",
      tipo: 1,
      orden: null,
      dataEdit: [],
      select_to_arca: {},
      maximizedToggle: false,
      initialPagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {name: "co_vehicu", align: "left", label: "Código", field: "co_vehicu", sortable: true},
        {name: "co_plaveh", align: "center", label: "Placa", field: "co_plaveh", sortable: true},
        {name: "no_marveh", align: "left", label: "Marca", field: "no_marveh", sortable: true},
        {name: "no_modveh", align: "left", label: "Modelo", field: "no_modveh", sortable: true},
        {name: "no_verveh", align: "left", label: "Versión", field: "no_verveh", sortable: true},
        {name: "nu_anomod", align: "center", label: "Año Modelo", field: "nu_anomod", sortable: true},
        {name: "nu_anofab", align: "center", label: "Año Fab.", field: "nu_anofab", sortable: true},
        {name: "no_colveh", align: "left", label: "Color", field: "no_colveh", sortable: true},
        {name: "nu_serveh", align: "left", label: "Chasis", field: "nu_serveh", sortable: true},
        {name: "nu_motveh", align: "left", label: "Motor", field: "nu_motveh", sortable: true},
        {name: "nu_asiveh", align: "right", label: "Asientos", field: "nu_asiveh", sortable: true}
      ]
    };
  },
  methods: {
    ...mapActions("comercial", [
      "call_listar_vehicu",
      "call_inform_vehicu"
    ]),
    async generarOperacion(val) {
      this.$q.loading.show();
      this.$store.commit("comercial/documentoVenta", val.co_vehicu);
      await this.call_inform_vehicu({
        co_vehicu: `${val.co_vehicu}` 
      });
      console.log(val);
      this.$q.notify({
        message: `${val.co_factur}`
      });
      this.$store.commit("comercial/dialogOperacion", true);
      this.$q.loading.hide();
    }

  }
  
};
</script>