<template>
  <div>
    <q-card :class="$q.screen.gt.md ? 'full-height' : ''" square>
      <!--      {{ get_inform_ordcom }}-->
      <q-bar class="bg-primary text-white">
        DETALLE FACTURA
        <q-space />
        <q-btn dense flat icon="close" @click="cerrar">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section style="height: 45%">
        <div class="row">
          <div class="col-xs-15 col-md-6 q-pa-s">
            <DatosdelaOC :info="get_inform_factur" />
            <TablaCaracteristicaVehiculo />
          </div>
          <div class="col-xs-12 col-md-6 q-pa-xs">
            <TablaOperacionesFacturadas />
            <TablaProductosdelaOrden />
            <BuscarProductos />
            
          </div>
          
        </div>
      </q-card-section>

      <q-separator />

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
    DatosdelaOC: () => import("./DatosdelaOC"),
    TablaProductosdelaOrden: () => import("./TablaProductosdelaOrden"),
    TablaOperacionesFacturadas: () => import("./TablaOperacionesFacturadas"),
    TablaCaracteristicaVehiculo: () => import("./TablaCaracteristicaVehiculo"),
    BuscarProductos: () => import("./BuscarProductos")
  },
  computed: {
    ...mapState("finanzas", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("finanzas", [
      "get_inform_factur",
      "get_listar_operac_encont",
      "get_listar_operac_factur",
      "get_listar_caract_vehicu"
      
    ])
  },
  name: "DialogDetalleOrden",
  data() {
    return {
      model: null,
      oc: "",
      categoria: "",
      subcategoria: "",
      producto: "",
      placa: "",
      cliente: "",
      operacion: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        { name: "name", required: true, label: "Dessert (100g serving)", align: "left", field: row => row.name, format: val => `${val}`, sortable: true },
      ],
      data: [
        { name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: "12%", iron: "6%" }
      ]
    }; 
  },
  methods: {
    ...mapActions("finanzas", ["call_listar_factur"]),
    async cerrar() {
      this.$q.loading.show();
      await this.call_listar_factur({
        fe_regdes: "",
        fe_reghas: "",
        no_client: "",
        nu_factur: "",
        ti_estado: "",
        co_operac: "",
        ti_bandej: 0
      });
      this.$store.commit("finanzas/dialogDetalleOrden", false);
      this.$q.loading.hide();
    }
  }
};
</script>

<style scoped></style>
