<template>
  <q-page padding>
    <div>
      <Titulos icon="group" color="primary" @click="boton" titulo="Usuarios" />
    </div>
    <q-separator color="primary" />
    <!--    {{ $store.state.usuarios.dataEdit }}-->
    <!--    <div align="center">-->
    <!--      <Filtros />-->
    <!--    </div>-->
    <div v-if="getUsers" align="center">
      <TablaFiltro
        order="co_usuari"
        color="primary"
        :info="getUsers"
        :columns="columns"
        tool="usuarios"
        @click="boton"
        paginas="15"
        :exportar="false"
        gridactivate="false"
      />
    </div>
    <div>
      <DialogCrear :tipo="tipo" :info="dataEdit" />
    </div>
    <!-- content -->
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PageUsuario",
  data() {
    return {
      tipo: 1,
      dataEdit: {},
      dialogCrear: false,
      activarCrear: false,
      dialog: false,
      columns: [
        {
          name: "co_usuari",
          align: "left",
          label: "ID",
          field: "co_usuari",
          sortable: true
        },
        {
          name: "no_usuari",
          align: "left",
          label: "Nombre",
          field: "no_usuari",
          sortable: true
        },
        {
          name: "il_activo",
          align: "left",
          label: "Activo",
          field: row => (row.il_activo ? "Activo" : "Inactivo"),
          sortable: true
        },
        {
          name: "detail",
          align: "left",
          label: "Detail",
          field: "detail",
          sortable: true
        },
        {
          name: "action",
          align: "right",
          label: "Acciones",
          field: "action",
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters("usuarios", ["getUsers"])
  },
  components: {
    Filtros: () => import("../components/Filtros"),
    Titulos: () => import("../components/Titulos"),
    TablaFiltro: () => import("../components/Usuarios/TablaFiltro"),
    DialogCrear: () => import("../components/Usuarios/CrearUsuario")
  },
  methods: {
    ...mapActions("usuarios", ["callUsers"]),
    boton(val) {
      console.log("Boton en Personas");
      this.tipo = val;
      if (val === 1) {
        console.log("Boton en Personas 1");
        // this.dialogCrear = true;
        console.log("se preciono el boton");
        this.$store.commit("usuarios/dialogCrear", true);
      } else if (val === 2) {
        this.dataEdit = this.$store.state.usuarios.dataEdit;
        console.log("Boton en Personas 2");
        // this.dialogCrear = true;
        console.log("se preciono el boton");
        // this.$store.commit("usuarios/dialogEdit", true);
      }
    }
  },
  async created() {
    this.$q.loading.show();
    this.$store.commit("example/location", "Usuarios");
    await this.callUsers("all");
    this.$q.loading.hide();
  }
};
</script>
