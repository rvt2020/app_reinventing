<template>
  <div>
    <!--    <q-card class="full-height" square>-->
    <div>
        <q-card class="full-height" square>
        <q-bar class="bg-primary text-white">
            Imprimir Operación
            <q-space />
            <q-btn dense flat icon="close" @click="$emit('click')">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
        </q-bar>
        
        <q-card-section>
          <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-9">
              <q-input
                autofocus
                dense
                filled
                v-model="buscar"
                label="Operación"
              />
            </div>
            <div class="col-3">
              <q-btn size="md" color="green" type="submit" icon-right="search" />
            </div>
          </div>
        </q-form>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
        </q-card-section>

        <q-separator />
        <q-card-section>
            <div class="row">
                <div class="col-xs-12 col-md-4">
                <DatosOperacion
                    v-if="getOperacionesAbrir_operacion.operac.length > 0"
                    :info="getOperacionesAbrir_operacion.operac"
                    titulo="Datos de Operación"
                    :hideheader="true"
                    :hidebottom="true"
                />
                </div>
                <div class="col-xs-12 col-md-4">
                <DatosVehiculo
                    v-if="getOperacionesAbrir_operacion.vehicu.length > 0"
                    :info="getOperacionesAbrir_operacion.vehicu"
                    titulo="Vehículo"
                    :hideheader="true"
                    :hidebottom="true"
                />
                </div>
                <div class="col-xs-12 col-md-4">
                <DatosCliente
                    v-if="getOperacionesAbrir_operacion.client.length > 0"
                    :info="getOperacionesAbrir_operacion.client"
                    titulo="Cliente"
                    :hideheader="true"
                    :hidebottom="true"
                />
                </div>
            </div>

            <!-- SERVICIOS -->
            <div class="row">
                <div class="col">
                <ListaServicios
                    v-if="getOperacionesAbrir_operacion.servic.length > 0"
                    :info="getOperacionesAbrir_operacion.servic"
                    titulo="Servicios"
                    :hideheader="false"
                    :hidebottom="true"
                />
                </div>
            </div>
            <!-- MATERIALES -->
            <div class="row">
                <div class="col">
                <ListaMateriales
                    v-if="getOperacionesAbrir_operacion.materi.length > 0"
                    :info="getOperacionesAbrir_operacion.materi"
                    titulo="Materiales"
                    :hideheader="false"
                    :hidebottom="true"
                />
                </div>
            </div>

        </q-card-section>

        <!-- <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions> -->
        </q-card>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const stringOptions = ["Servicios", "Materiales"];
export default {
  name: "DialogOpenOperac",
  computed: {
    ...mapGetters("operaciones", ["getOperacionesAbrir_operacion"])
  },
  components: {
    DatosOperacion: () => import("./ImprimirOperacion/DatosOperacion"),
    DatosVehiculo: () => import("./ImprimirOperacion/DatosVehiculo"),
    DatosCliente: () => import("./ImprimirOperacion/DatosCliente"),
    ListaServicios: () => import("./ImprimirOperacion/ListaServicios"),
    ListaMateriales: () => import("./ImprimirOperacion/ListaMateriales"),
    TablaServicios: () => import("./TablaServiciosAbrirOperaciones"),
    TablaMateriales: () => import("./TablaMaterialesAbrirOperaciones")
    
  },
  data() {
    return {
      model: null,
      precioUnitario: null,
      cantidad: null,
      maximizedToggle: true,
      data: []
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "callOperacionesAbrir_operacion"
    ]),
    
    
  },
  async created() {
    console.log("Imprimir Operacion");
    this.$q.loading.show();
    await this.callOperacionesAbrir_operacion(this.$store.state.operaciones.numeroDeOperacion);
    //await this.callOperacionesAbrir_operacion(this.$route.query.op);
    
    this.$q.loading.hide();
  }
};
</script>

<style>
/* .my-table-details {
      font-size: 0.85em;
      font-style: italic;
      max-width: 200px;
      white-space: normal;
      color: #555;
      margin-top: 4px;
    } */
/* .q-field--dense .q-field__control,
    .q-field--dense .q-field__marginal {
      height: 15px;
      border-bottom: 1px solid black;
      width: 50px;
    } */
.campoeditartd {
  text-align: -webkit-center;
  /* text-align: center; */
}

.campoeditar {
  height: 15px;
  /* border-bottom: 1px solid black; */
  width: 100px;
}
</style>
