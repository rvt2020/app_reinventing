<template>
  <div>
    <q-card :class="$q.screen.gt.md ? 'min-height' : ''" square>
      <!--      {{ get_inform_tradoc }}-->
      <q-bar class="bg-primary text-white">
        DETALLE TRAMITE DOCUMENTARIO
        <q-space />
        <q-btn dense flat icon="close" @click="cerrar">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section style="height: 50%">
        <div class="row">
          <div class="col-xs-12 col-md-6 q-pa-xs">
            <DatosdelaOC :info="get_inform_tradoc" />
            <TablaProductosdelaOrden />
            <TablaServiciosdelaOrden />
          </div>
          <div class="col-xs-12 col-md-6 q-pa-xs">
            <BuscarProductos />
            <BuscarServicios />
          </div>
        </div>
      </q-card-section>

      
      
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    DatosdelaOC: () => import("./DatosdelaOC"),
    TablaProductosdelaOrden: () => import("./TablaProductosdelaOrden"),
    TablaServiciosdelaOrden: () => import("./TablaServiciosdelaOrden"),
    BuscarProductos: () => import("./BuscarProductos"),
    BuscarServicios: () => import("./BuscarServicios")
  },
  computed: {
    ...mapState("tramites", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("tramites", [
        "get_inform_tradoc", 
        "get_listar_produc_encont", 
        "get_listar_servic_encont",
        "get_listar_detall_tradoc", 
        "get_listar_detall_servic_tradoc"  
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
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        {
          name: "name",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        {
          name: "calcium",
          label: "Calcium (%)",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: []
    };
  },
  methods: {
    cerrar() {
      this.$store.commit("tramites/dialogDetalleOrden", false);
    }
  }
};
</script>

<style scoped></style>
