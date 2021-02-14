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
                label="Buscar Operación"
              />
            </div>
            <div class="col-3">
              <q-btn size="md" color="red" type="submit" icon-right="search" />
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
          <TablaDVC
            v-if="getOperacionesAbrir_operacion.operac.length > 0"
            :info="getOperacionesAbrir_operacion.operac"
            titulo="Datos de Operación"
            :hideheader="true"
            :hidebottom="true"
          />
        </div>
        <div class="col-xs-12 col-md-4">
          <TablaV
            v-if="getOperacionesAbrir_operacion.vehicu.length > 0"
            :info="getOperacionesAbrir_operacion.vehicu"
            titulo="Vehículo"
            :hideheader="true"
            :hidebottom="true"
          />
        </div>
        <div class="col-xs-12 col-md-4">
          <TablaC
            v-if="getOperacionesAbrir_operacion.client.length > 0"
            :info="getOperacionesAbrir_operacion.client"
            titulo="Cliente"
            :hideheader="true"
            :hidebottom="true"
          />
          <div class="text-center q-pa-md q-gutter-md">
            <q-btn
              v-if="getOperacionesAbrir_operacion.client.length > 0"
              size="sm"
              color="primary"
              icon-right="add"
              label="Agregar Servicios y Materiales"
              @click="agregarServicios = true"
            />
          </div>
        </div>
      </div>
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <TablaServicios
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
          <TablaMateriales
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
    <q-dialog
      v-if="agregarServicios"
      v-model="agregarServicios"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      full-height
      full-width
    >
      <DialogAddServicios @click="cerrarDialogAddServicios" />
    </q-dialog>
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
      agregarServicios: false,
      agregarMateriales: false,
      buscar: this.$store.state.operaciones.numeroDeOperacion
        ? this.$store.state.operaciones.numeroDeOperacion
        : "",
      noencontrado: false
    };
  },
  components: {
    TablaDVC: () => import("./TablaOperacion"),
    TablaV: () => import("./TablaVehiculo"),
    TablaC: () => import("./TablaCliente"),
    // Tabla: () => import("./TablaAbrirOperaciones"),
    TablaServicios: () => import("./TablaServiciosAbrirOperaciones"),
    TablaMateriales: () => import("./TablaMaterialesAbrirOperaciones"),
    DialogAddServicios: () => import("./DialogAddServicios"),
    DialogAddMateriales: () => import("./DialogAddMateriales")
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
    async cerrarDialogAddServicios() {
      this.agregarServicios = false;
      await this.buscarOperaciones();
    }
  },
  async created() {
    this.$q.loading.show();
    console.log("2. Abrir Operación");
    console.log(this.$store.state.operaciones.numeroDeOperacion);
    console.log(this.$route.query.op);
    console.log("2. Abrir Operación");
    if (this.$route.query.op != undefined) {
      console.log("entro al if");
      this.buscar = this.$route.query.op;
      this.$store.commit("operaciones/numeroDeOperacion", this.$route.query.op);
      await this.callOperacionesAbrir_operacion(this.$route.query.op);
      this.$router.replace("/operaciones?id=2");
    } else {
      this.$router.replace("/operaciones?id=2");
    }
    // this.$q.notify({
    //   message: "2. Abrir Operación"
    // });
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
