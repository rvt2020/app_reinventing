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
      dataEdit: {},
      dialogCrear: false,
      activarCrear: false,
      dialog: false,
      no_client: "",
      columns: [
        {
          name: "co_client",
          align: "left",
          label: "ID Cliente",
          field: "co_client",
          sortable: true,
        },
        {
          name: "no_client",
          align: "left",
          label: "Cliente",
          field: "no_client",
          sortable: true,
        },
        {
          name: "nu_telefo",
          align: "left",
          label: "Teléfono",
          field: "nu_telefo",
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
          name: "no_tipcli",
          align: "right",
          label: "Tipo Cliente",
          field: "no_tipcli",
          sortable: true,
        },
        {
          name: "no_tipser",
          align: "right",
          label: "Tipo Servicio",
          field: "no_tipser",
          sortable: true,
        },
        {
          name: "km_manten",
          align: "right",
          label: "Kilometraje",
          field: "km_manten",
          sortable: true,
        },
        {
          name: "fe_ulttra",
          align: "center",
          label: "Último Trabajo",
          field: "fe_ulttra",
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
    this.$store.commit("example/location", "llamadas");
    await this.call_listar_llamad({
      no_client: this.no_client,
    });
    this.filtrosNuevos;
    this.$q.loading.hide();
  },
};
</script>