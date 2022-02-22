<template>
  <div class="col-xs-12 col-md-6 q-pa-xs">
    <q-card >
      <!--      {{ get_inform_ordcom }}-->
      <q-bar class="bg-primary text-white">
        TRÁMITE
      </q-bar>
      
      <!-- VENTANA 1 --> 
      <q-card-section>
        <!-- INFORMACIÓN DE LOS DATOS DE LA OC--> 
        <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
            <DatosdelVehiculo :info="get_inform_vehicu_tramite" />
          </div>
        </div>
      </q-card-section>

      <!-- BOTONES -->
      <q-card-actions align="center">
        <q-btn outline label="Cerrar" color="red" @click="cerrar()" />
      </q-card-actions>
      
    </q-card>
    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../../mixins/mixin";
import { date } from "quasar";
let timeStamp = Date.now();

export default {
  components: {
    DatosdelVehiculo: () => import("./DatosdelVehiculo")
  },
  computed: {
    ...mapState("tiv", ["dialogDetalle"]),
    ...mapGetters("tiv", [
        "get_inform_vehicu_tramite",
        "get_listar_bandeja_general"]),
    
    foo: {
      get() {
        return this.dataEdit;
      },
      set(value) {
        this.$store.commit("main/foo", value);
      }
    },
    urlimagen() {
      return `${process.env.Imagen_URL}/upload`;
    }
  },
  name: "DialogDetalle",
  data() {
    return {
      model: null,
      oc: "",
      mostrarFormulario: false,
      loadboton: false,
      tipvehicu: null,
      mar_veh: null,
      mod_veh: null,
      anio: null,
      color: "",
      chasis: "",
      motor: "",
      co_tipveh: ""
      
    }; 
  },
  methods: {
    ...mapActions("tiv", [
        "call_listar_bandeja_general", 
        "call_inform_vehicu_tramite"]),
    
    ////BOTÓN "CANCELAR" : PARA QUE SE CIERRE LA VENTANA FLOTANTE
    async cerrar() {
      this.$q.loading.show();
      this.$store.commit("paratramite/dialogDetalle", false);
      this.$q.loading.hide();
    }
  },

  async created() {
    //await this.callMarcas("all");
      this.$q.loading.hide();
  }
};
</script>
<style scoped></style>
