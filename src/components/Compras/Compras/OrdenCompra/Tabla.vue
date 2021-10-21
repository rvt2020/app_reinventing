<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Lista de Compras"
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
      <!-- BOTON QUE ENVIA PARAMETRO CON EL CAMPO DE UNA TABLA
        <template v-slot:body-cell-co_plaveh="props">
          <q-td :props="props">
            <q-btn
              size="xs"
              color="green"
              :label="`${props.row.co_plaveh}`"
              @click="generarOperacion(props.row)"
            />
          </q-td>
        </template>
      -->
      <!-- BOTON QUE ENVIA CON UN TEXTO SIMPLE -->
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="green"
            label="Nuevo"
            @click="generarVehiculo(props.row)"
          />
        </q-td>
      </template>

    </q-table>
    
    <q-dialog
      v-model="dialogVehiculo"
      style="width: 100%; max-width: 250px"
      persistent
      position="top"
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 q-pa-xs">
              <DialogGenerarVehiculo />
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
    ...mapState("comercial", ["dialogVehiculo"]),
    ...mapGetters("comercial", ["get_inform_compra_art", "get_catalogo_tctipveh", "get_catalogo_tcmoneda"])
  },
  //SUPUESTAMENTE AQUI VA COMPONENT
  components: {
    DialogGenerarVehiculo: () => import("./DialogVehiculo")
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
        {name: "id_ordcom", align: "center", label: "Orden Compra", field: "id_ordcom", sortable: true},
        {name: "co_ordcom", align: "left", label: "Código", field: "co_ordcom", sortable: true},
        {name: "fe_ordcom", align: "center", label: "F. Emisión", field: "fe_ordcom", sortable: true},
        {name: "co_docide", align: "center", label: "RUC", field: "co_docide", sortable: true},
        {name: "no_provee", align: "left", label: "Proveedor", field: "no_provee", sortable: true},
        {name: "no_moneda", align: "left", label: "Moneda", field: "no_moneda", sortable: true},
        {name: "co_comart", align: "left", label: "Código", field: "co_comart", sortable: true},
        {name: "co_barras", align: "center", label: "Id.", field: "co_barras", sortable: true},
        {name: "no_articu", align: "left", label: "Producto", field: "no_articu", sortable: true},
        {name: "ca_articu", align: "right", label: "Cantidad", field: "ca_articu", sortable: true},
        {name: "im_preuni", align: "right", label: "Precio Unitario", field: "im_preuni", sortable: true},
        {name: "accion", label: "", field: "accion", sortable: true }
      ]
    };
  },
  methods: {
    ...mapActions("comercial", ["call_listar_compra_vehicu","call_inform_compra_art", "call_catalogo_tctipveh", "call_catalogo_tcmoneda"]),
    //BOTÓN "GENERAR OPERACION" : MUESTRA LA INFORMACIÓN DEL VEHÍCULO Y COMBOS
    async generarVehiculo(val) {
      this.$q.loading.show();
      await this.call_inform_compra_art({
        co_ordcom: `${val.co_ordcom}`,
        co_comart: `${val.co_comart}` 
      });
      await this.call_listar_compra_vehicu();
      await this.call_catalogo_tctipveh();
      await this.call_catalogo_tcmoneda();
      console.log(val);
      this.$store.commit("comercial/dialogVehiculo", true);
      this.$q.loading.hide();
      this.$q.notify({
        message: val.co_ordcom
      });
    },
    
  }
  
};
</script>

