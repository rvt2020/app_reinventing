<template>
  <div class="q-pa-md">
    <!--    {{ getOperacionesAbrir_operacion }}-->
    <!--    Buscar Operacion-->
    <div class="row" align="center">
      <div class="col-4"></div>
      <div class="col-4 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-9">
              <q-input
                autofocus
                dense
                filled
                v-model="buscar"
                label="Proforma"
              />
            </div>
            <div class="col-3">
              <q-btn size="md" color="green" type="submit" label="Reinventing" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-4"></div>
    </div>
    <!--    Datos - Vehiculos - Cliente-->
    <div v-if="getOperacionesAbrir_operacion.res === 'ok'">
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <DatosVehiculoCliente
            v-if="getOperacionesAbrir_operacion.vehicu.length > 0"
            :info="getOperacionesAbrir_operacion.vehicu"
            titulo="Datos del Cliente"
            :hideheader="false"
            :hidebottom="true"
          />
        </div>
        <div class="col-xs-12 col-md-4">
          <DatosOperacionImporte
            v-if="getOperacionesAbrir_operacion.operac.length > 0"
            :info="getOperacionesAbrir_operacion.operac"
            titulo="Datos de la Proforma"
            :hideheader="false"
            :hidebottom="true"
          />
        </div>
      </div>
      <!-- TablaServicios -->
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
      <!-- TablaMateriales -->
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
    </div>
    <div v-if="getOperacionesAbrir_operacion.res === 'ko'">
      <q-banner dense inline-actions class="text-white bg-red">
        Error al cargar la info: {{ getOperacionesAbrir_operacion }}
        <template v-slot:action>
          <!-- <q-btn flat color="white" label="HOME" /> -->
        </template>
      </q-banner>
    </div>
    <div v-if="noencontrado">
      <q-banner dense inline-actions class="text-white bg-red">
        :( no se encontro lo que estas buscando de: {{ buscar }}
      </q-banner>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("operaciones", ["getOperacionesAbrir_operacion"])
  },
  name: "AbrirOperacion",
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      buscar: this.$store.state.operaciones.numeroDeOperacion
        ? this.$store.state.operaciones.numeroDeOperacion
        : "",
      noencontrado: false
    };
  },
  components: {
    DatosOperacion: () => import("./DatosOperacion"),
    DatosOperacionImporte: () => import("./DatosOperacionImporte"),
    DatosVehiculo: () => import("./DatosVehiculo"),
    DatosVehiculoCliente: () => import("./DatosVehiculoCliente"),
    DatosCliente: () => import("./DatosCliente"),
    // Tabla: () => import("./TablaAbrirOperaciones"),
    ListaServicios: () => import("./ListaServicios"),
    ListaMateriales: () => import("./ListaMateriales")
  },
  methods: {
    ...mapActions("operaciones", ["callOperacionesAbrir_operacion"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      try {
        if (this.buscar.length > 0) {
          this.$store.commit("operaciones/numeroDeOperacion", this.buscar);
          await this.callOperacionesAbrir_operacion(this.buscar);
          this.$q.loading.hide();
          this.noencontrado = false;
        } else {
          this.$q.notify({
            message: "No puede estar vacio el campo de busqueda"
          });
          this.noencontrado = true;
          this.$q.loading.hide();
        }
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
        this.noencontrado = true;
      }
    },
    
  },
  async created() {
    this.$q.loading.show();
    if (this.$route.query.op != undefined) {
      console.log("entro al if");
      this.buscar = this.$route.query.op;
      this.$store.commit("operaciones/numeroDeOperacion", this.$route.query.op);
      await this.callOperacionesAbrir_operacion(this.$route.query.op);
      this.$router.replace("/imprimiroperacion");
    } else {
      this.$router.replace("/imprimiroperacion");
    }
    // this.$q.notify({
    //   message: "2. Abrir Operación"
    // });
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
