<template>
  <div class="q-pa-md">
    <!--    {{ getOperacionesAbrir_operacion }}-->
    <!--    Buscar Operacion-->
    <div class="row" align="center">
      <div class="col-2"></div>
      <div class="col-8 q-pb-md">
        <q-form @submit="buscarOperaciones">
          <div class="row">
            <div class="col-xs-12 col-sm-4 q-pa-xs">
              <q-input filled dense v-model="fecha_ini" label="Fecha Inicio">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha_ini" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-4 q-pa-xs">
              <q-input filled dense v-model="fecha_fin" label="Fecha Fin">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha_fin" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-input dense filled v-model="placa" type="text" label="Placa" />
            </div>
            <div class="col-xs-12 col-sm-2 q-pa-xs">
              <q-btn size="md" color="red" type="submit" icon-right="search" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-2"></div>
    </div>
    <!--    Datos - Vehiculos - Cliente-->
    <div>
      <!-- TablaServicios -->
      <div class="row">
        <div class="col">
          <TablaListadeIngresoVehicular :info="get_mostrar_ingreso.operac" />
        </div>
      </div>
      <!-- TablaMateriales -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("operaciones", ["get_mostrar_ingreso"]),
  },
  name: "AbrirOperacion",
  data() {
    return {
      maximizedToggle: false,
      buscarServiciosMateriales: "",
      agregarServicios: false,
      agregarMateriales: false,
      buscar: "",
      fecha_ini: "",
      fecha_fin: "",
      placa: "",
      date: "2019/02/01",
    };
  },
  components: {
    TablaListadeIngresoVehicular: () =>
      import("./TablaListadeIngresoVehicular"),
    // DialogAddServicios: () => import("./DialogAddServicios"),
  },
  methods: {
    ...mapActions("operaciones", ["call_mostrar_ingreso"]),
    async buscarOperaciones() {
      this.$q.loading.show();
      this.$store.commit("operaciones/numeroDeOperacion", this.buscar);
      await this.call_mostrar_ingreso({
        fec_ini: "",
        fec_fin: "",
        pla_veh: this.placa,
      });
      this.$q.loading.hide();
    },
  },
  async created() {
    this.$q.loading.show();
    await this.call_mostrar_ingreso();
    this.$router.replace("/operaciones?id=1");
    // this.$q.notify({
    //   message: "1. Nueva Operacion",
    // });
    this.$q.loading.hide();
  },
};
</script>
