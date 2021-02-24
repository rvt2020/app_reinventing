<template>
  <div>
    <q-page padding>
      <div>Llamadas</div>

      <q-separator color="green" />
      <Llamadas />
    </q-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PageLLamadas",

  data() {
    return {
      no_client: "all",
      dataEdit: {},
      dialogCrear: false,
      activarCrear: false,
      dialog: false,
      columns: [
        {
          name: "co_vehicu",
          align: "left",
          label: "ID",
          field: "co_vehicu",
          sortable: true,
        },
        {
          name: "co_plaveh",
          align: "left",
          label: "Placa",
          field: "co_plaveh",
          sortable: true,
        },
        {
          name: "no_marveh",
          align: "left",
          label: "Marca",
          field: "no_marveh",
          sortable: true,
        },
        {
          name: "no_modveh",
          align: "left",
          label: "Modelo",
          field: "no_modveh",
          sortable: true,
        },
        {
          name: "nu_anofab",
          align: "left",
          label: "Año",
          field: "nu_anofab",
          sortable: true,
        },
        {
          name: "no_colveh",
          align: "left",
          label: "Color",
          field: "no_colveh",
          sortable: true,
        },
        {
          name: "action",
          align: "right",
          label: "Acciones",
          field: "action",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("llamadas", ["get_listar_llamad"]),
  },
  components: {
    Filtros: () => import("../components/Filtros"),
    Titulos: () => import("../components/Titulos"),
    Llamadas: () => import("components/Llamadas/Llamadas"),
  },
  methods: {
    ...mapActions("llamadas", ["call_listar_llamad"]),
    exportarData() {
      this.$q.notify({
        message: "Por definir :)",
      });
    },
  },
  async created() {
    this.$q.loading.show();
    this.$store.commit("example/location", "Llamadas");
    await this.call_listar_llamad({
      no_client: this.no_client,
    });
    this.filtrosNuevos;
    this.$q.loading.hide();
  },
};
</script>