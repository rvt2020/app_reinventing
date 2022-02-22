<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Vehículos para Trámite"
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
      <!-- BOTON QUE ENVIA PARAMETRO CON EL CAMPO DE UNA TABLA -->
        <template v-slot:body-cell-co_plaveh="props">
          <q-td :props="props">
            <q-btn
              size="xs"
              color="green"
              :label="`${props.row.co_plaveh}`"
              @click="TivDetalleGeneral(props.row)"
            />
          </q-td>
        </template>
      
      
    </q-table>
    
    <q-dialog
      v-model="dialogDetalle"
      style="width: 100%; max-width: 250px"
      persistent
      position="top"
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 q-pa-xs">
              <DialogVerDetalle />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>

/* 
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
*/
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../../mixins/mixin";
//import { MixinDefault } from "../../../mixins/mixin";
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
    ...mapState("tiv", ["dialogDetalle"]),
    ...mapGetters("tiv", ["get_inform_vehicu_tramite", "get_listar_bandeja_general"])
  },
  //SUPUESTAMENTE AQUI VA COMPONENT
  components: {
    DialogVerDetalle: () => import("./DialogDetalle")
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
        {name: "co_docide", align: "center", label: "DNI", field: "co_docide", sortable: true},
        {name: "no_person", align: "left", label: "Nombre", field: "no_person", sortable: true},
        //{name: "co_vehicu", align: "center", label: "Código", field: "co_vehicu", sortable: true},
        {name: "co_plaveh", align: "center", label: "Placa", field: "co_plaveh", sortable: true},
        {name: "no_marveh", align: "left", label: "Marca", field: "no_marveh", sortable: true},
        {name: "no_modveh", align: "left", label: "Modelo", field: "no_modveh", sortable: true},
        {name: "no_verveh", align: "left", label: "Versión", field: "no_verveh", sortable: true},
        {name: "nu_serveh", align: "center", label: "Chasis", field: "nu_serveh", sortable: true},
        {name: "nu_motveh", align: "left", label: "Motor", field: "nu_motveh", sortable: true},
        {name: "nu_anomod", align: "center", label: "Año", field: "nu_anomod", sortable: true},
        {name: "id_ordcom", align: "center", label: "O/C", field: "id_ordcom", sortable: true},
        {name: "no_provee", align: "left", label: "Proveedor", field: "no_provee", sortable: true},
        {name: "fe_ordcom", align: "center", label: "Fecha", field: "fe_ordcom", sortable: true},
        {name: "im_preuni", align: "right", label: "Precio", field: "im_preuni", sortable: true},
        {name: "no_moneda", align: "left", label: "Moneda", field: "no_moneda", sortable: true},
        {name: "fe_facpro", align: "center", label: "F. Factura", field: "fe_facpro", sortable: true},
        {name: "nu_facpro", align: "left", label: "Nro. Factura", field: "nu_facpro", sortable: true},
        {name: "fe_desemb", align: "center", label: "Desembolso", field: "fe_desemb", sortable: true},
        {name: "fe_maxent", align: "center", label: "Max. Entrega", field: "fe_maxent", sortable: true},
        {name: "fe_docume", align: "center", label: "Documentado", field: "fe_docume", sortable: true},
        {name: "pe_tramit", align: "left", label: "Tramitador", field: "pe_tramit", sortable: true},
        {name: "fe_distri", align: "center", label: "Distribuido", field: "fe_distri", sortable: true},
        {name: "fe_califi", align: "center", label: "En Calificación", field: "fe_califi", sortable: true},
        {name: "fe_observ", align: "center", label: "Observado", field: "fe_observ", sortable: true},
        {name: "fe_rechaz", align: "center", label: "Rechazado", field: "fe_rechaz", sortable: true},
        {name: "fe_inscri", align: "center", label: "Inscrito", field: "fe_inscri", sortable: true},
        {name: "nu_titulo", align: "center", label: "Título", field: "nu_titulo", sortable: true},
        {name: "fe_regsoa", align: "center", label: "SOAT", field: "fe_regsoa", sortable: true},
        {name: "fe_insgps", align: "center", label: "GPS", field: "fe_insgps", sortable: true},
        {name: "fe_ultras", align: "center", label: "Ultraseal", field: "fe_ultras", sortable: true},
        {name: "fe_ingtal", align: "center", label: "En Taller", field: "fe_ingtal", sortable: true},
        {name: "fe_citent", align: "center", label: "Citado", field: "fe_citent", sortable: true},
        {name: "fe_entreg", align: "center", label: "Entregado", field: "fe_entreg", sortable: true},
        {name: "accion", label: "", field: "accion", sortable: true }
      ]
    };
  },
  methods: {
    ...mapActions("tiv", ["call_listar_bandeja_general","call_inform_vehicu_tramite"]),
    
  }
  
};
</script>

