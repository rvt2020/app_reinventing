<template>
  <q-page padding>
    <div>
      <Titulos icon="event" color="red" @click="boton" titulo="Citas" />
    </div>
    <q-separator color="red" />
    <!--    <div align="center">-->
    <!--      <Filtros />-->
    <!--    </div>-->
    <!--    {{getCitas}}-->
    <div v-if="getCitas" align="center">
      <!--      <TablaFiltro-->
      <!--        order="co_person"-->
      <!--        color="red"-->
      <!--        tool="citas"-->
      <!--        @click="boton"-->
      <!--        :info="getCitas"-->
      <!--        :columns="columns"-->
      <!--        paginas="15"-->
      <!--        :exportar="false"-->
      <!--        gridactivate="false"-->
      <!--      />-->
      <Calendario :info="getCitas" />
    </div>
    <!--    {{ $store.state.citas.dialogCrear }}-->
    <!--    <div v-if="$store.state.citas.dialogCrear">-->
    <!--      <DialogCrear :tipo="tipo" :info="dataEdit" />-->
    <!--    </div>-->
    <!--    <div v-if="$store.state.citas.dialogCrear">-->
    <!--    <div v-if="dialogCrear">-->
    <div>
      <DialogCrear :tipo="tipo" :info="dataEdit" />
    </div>
    <!--    </div>-->
    <!-- content -->
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PageCitas",
  data() {
    return {
      tipo: 1,
      dataEdit: {},
      dialogCrear: false,
      activarCrear: false,
      dialog: false,
      columns: [
        {
          name: "co_person",
          align: "left",
          label: "ID",
          field: "co_person",
          sortable: true
        },
        {
          name: "no_nombre",
          align: "left",
          label: "Nombre",
          field: "no_nombre",
          sortable: true
        },
        {
          name: "ti_docide",
          align: "left",
          label: "Tipo de Documento",
          field: "ti_docide",
          sortable: true
        },
        {
          name: "co_docide",
          align: "left",
          label: "N° de Documento",
          field: "co_docide",
          sortable: true
        },
        {
          name: "nu_teléfo",
          align: "left",
          label: "Telefonos",
          field: "nu_teléfo",
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
    ...mapGetters("citas", ["getCitas"])
  },
  components: {
    Filtros: () => import("../components/Filtros"),
    Titulos: () => import("../components/Titulos"),
    TablaFiltro: () => import("../components/TablaFiltro"),
    DialogCrear: () => import("../components/Citas/Crear"),
    Calendario: () => import("../components/Citas/Calendario")
  },
  methods: {
    ...mapActions("citas", ["callCitas"]),
    boton(val) {
      console.log("Boton en Citas");
      this.tipo = val;
      if (val === 1) {
        console.log("Boton en Citas 1");
        this.dialogCrear = true;
        console.log("se preciono el boton");
        this.$store.commit("citas/dialogCrear", true);
      } else if (val === 2) {
        this.dataEdit = this.$store.state.citas.dataEdit;
        console.log("Boton en Citas 2");
        this.dialogCrear = true;
        console.log("se preciono el boton");
        this.$store.commit("citas/dialogCrear", true);
      }
    }
  },
  async created() {
    this.$q.loading.show();
    this.$store.commit("example/location", "Citas");
    await this.callCitas();
    this.$q.loading.hide();
  }
};
</script>
