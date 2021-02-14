# Quasar App (reinventingapp)
Produccion
A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


### Table
color="primary"
card-class="bg-amber-1 text-brown"
table-class="text-grey-8"
table-header-class="text-brown"
:pagination="initialPagination"
virtual-scroll
class="my-sticky-header-table"

### Pagination Table
initialPagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      }


### Dialog Full
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

<template>
  <div>
    <q-card class="full-height" square>
      <q-bar class="bg-primary text-white">
        Datos Ingreso O/C
        <q-space />
        <q-btn dense flat icon="close" @click="cerrar">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <DatosdeIngreso />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!--        {{ get_buscar_operacion.result[0] }}-->
        <!--        <TablaBuscar :info="get_buscar_operacion.result" />-->
        <ArticulosIngresaran />
      </q-card-section>

      <!-- <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions> -->
    </q-card>
  </div>
</template>

<script>
import { storagelocal } from "../../../../mixins/mixin";
import { mapActions, mapGetters } from "vuex";
const stringOptions = ["Servicios", "Materiales"];
export default {
  name: "DialogAddServicios",
  mixins: [storagelocal],
  components: {
    DatosdeIngreso: () => import("./DatosdeIngreso"),
    ArticulosIngresaran: () => import("./ArticulosIngresaran")
  },
  computed: {},
  data() {
    return {
      cod_ope: "",
      pla_veh: "",
      fec_ini: "",
      fec_fin: "",
      loadboton: false,
      clienteSelect: null,
      model: null,
      infoMateriales: [],
      infoServicios: [],
      precioUnitario: null,
      cantidad: null,
      maximizedToggle: true,
      tipodebusqueda: null,
      options: [],
      newoptions: [],
      buscarServiciosMateriales: "",
      filter: "",
      initialPagination: {
              sortBy: "name",
              descending: true,
              page: 1,
              rowsPerPage: 1000
            },
      columns1: [
        {
          name: "desc",
          required: true,
          label: "Fecha de Registro",
          align: "left",
          field: row => row.co_operac,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_opeveh",
          align: "center",
          label: "Usuario",
          field: "co_opeveh",
          sortable: true
        },
        { name: "fat", label: "N° Operación", field: "fat", sortable: true },
        { name: "no_tiptra", label: "Cliente", field: "no_tiptra" },
        { name: "no_servic", label: "Estado", field: "no_servic" },
        { name: "no_tipser", label: "Placa", field: "no_tipser" },
        { name: "im_preuni", label: "Marca", field: "im_preuni" },
        { name: "co_plaveh", label: "Modelo", field: "co_plaveh" },
        { name: "acciones", label: "Versión", field: "acciones" },
        { name: "acciones", label: "Año", field: "acciones" },
        { name: "acciones", label: "Color", field: "acciones" },
        { name: "acciones", label: "Chasis", field: "acciones" },
        { name: "acciones", label: "Motor", field: "acciones" },
        { name: "acciones", label: "Acciones", field: "acciones" }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_combo_cliente",
      "call_lista_vehiculo_ingreso",
      "call_nueva_operacion",
      "call_buscar_operacion"
    ]),
    cerrar() {
      this.$store.commit("almacen/dialogIngresoOC", false);
    }
  },
  async created() {
    this.$q.loading.show();

    this.$q.notify({
      message: "Creando"
    });
    console.log("DialogBuscarOperacion.vue");
    this.$q.loading.hide();
  }
};
</script>




### default
import { mapActions, mapGetters, mapState } from "vuex";




### date
import { date } from "quasar";
let timeStamp = Date.now();
date.formatDate(timeStamp, "YYYY-MM-DD")



### arcadj
this.$store.state.example.arcadj

docker build -t reinventing:2.0 .
docker-compose -f docker-compose_pro.yml down
docker-compose -f docker-compose_pro.yml up -d
docker-compose -f docker-compose_pro.yml logs -f


### autopintar cabeceras de las tablas

import { MixinDefault } from "../../../../mixins/mixin";

 mixins: [MixinDefault],

 props: {
    info: {
      type: Array,
      default: () => []
    }
  },
  
    computed: {
      ...mapState("reportes", ["dialogCrear", "dialogDetalleOrden"]),
      dataTable() {
        let data = [];
        console.log("this.info.length", this.info.length);
        for (let index = 0; index < this.info.length; index++) {
          const element = this.info[index];
          data.push({
            ...this.ObjKeyRename(element, this.labels)
          });
        }
        console.log("asdasdasd", data);
        return data;
      }
    },

  methods: {
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    asdasd(val) {
      console.log(val);
    }
  }
        
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ titulos(col.label) }}
            </q-th>
          </q-tr>
        </template>




#para buildear desarrollo -> ruta: /usr/local/dockerapps/reinventingapp
docker-compose -f docker-compose_dev.yml up -d --build


#para buildear produccion -> /usr/local/dockerapps/pro_reinventing
docker-compose -f docker-compose_pro.yml build
docker-compose -f docker-compose_pro.yml down
docker-compose -f docker-compose_pro.yml up -d