<template>
  <div>
    <q-card class="full-height" square>
      <q-bar class="bg-primary text-white">
        Datos de Salida OP
        <q-space />
        <q-btn dense flat icon="close" @click="cerrar">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <!--        {{ get_listar_docume_agrega_ingsal.message }}-->
        <DatosdeSalida :info="get_listar_docume_agrega_ingsal.message" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!--        {{ get_buscar_operacion.result[0] }}-->
        <!--        <TablaBuscar :info="get_buscar_operacion.result" />-->
        <!--        {{ get_listar_produc_agrega_ingsal }}-->
        <ArticulosIngresaran :info="get_listar_produc_agrega_ingsal.message" />
      </q-card-section>

      <!-- <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions> -->
    </q-card>
  </div>
</template>

<script>
import { storagelocal } from "../../../../mixins/mixin";
import { mapActions, mapGetters } from "vuex";
const stringOptions = ["Servicios", "Materiales"];
export default {
  name: "DialogAddServicios",
  mixins: [storagelocal],
  components: {
    DatosdeSalida: () => import("./DatosdeSalida"),
    ArticulosIngresaran: () => import("./ArticulosIngresaran")
  },
  computed: {
    ...mapGetters("almacen", [
      "get_listar_docume_agrega_ingsal",
      "get_listar_produc_agrega_ingsal"
    ])
  },
  data() {
    return {
      cod_ope: "",
      pla_veh: "",
      fec_ini: "",
      fec_fin: "",
      loadboton: false,
      clienteSelect: null,
      model: null,
      infoMateriales: [],
      infoServicios: [],
      precioUnitario: null,
      cantidad: null,
      maximizedToggle: true,
      tipodebusqueda: null,
      options: [],
      newoptions: [],
      buscarServiciosMateriales: "",
      filter: "",
      columns1: [
        {
          name: "desc",
          required: true,
          label: "Fecha de Registro",
          align: "left",
          field: row => row.co_operac,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_opeveh",
          align: "center",
          label: "Usuario",
          field: "co_opeveh",
          sortable: true
        },
        { name: "fat", label: "N° Operación", field: "fat", sortable: true },
        { name: "no_tiptra", label: "Cliente", field: "no_tiptra" },
        { name: "no_servic", label: "Estado", field: "no_servic" },
        { name: "no_tipser", label: "Placa", field: "no_tipser" },
        { name: "im_preuni", label: "Marca", field: "im_preuni" },
        { name: "co_plaveh", label: "Modelo", field: "co_plaveh" },
        { name: "acciones", label: "Versión", field: "acciones" },
        { name: "acciones", label: "Año", field: "acciones" },
        { name: "acciones", label: "Color", field: "acciones" },
        { name: "acciones", label: "Chasis", field: "acciones" },
        { name: "acciones", label: "Motor", field: "acciones" },
        { name: "acciones", label: "Acciones", field: "acciones" }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("almacen", [
      "call_quitar_produc_agrega_ingsal",
      "call_listar_produc_ordtra_ingres",
      "call_listar_produc_operac_salida"
    ]),
    async eliminar() {
      await this.call_quitar_produc_agrega_ingsal({
        co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
        fe_regist: date.formatDate(timeStamp, "YYYY-MM-DD"),
        co_prikey: "75",
        co_articu: null,
        ca_articu: null,
        il_unineg: "OP",
        ti_ingsal: "2"
      });
    },
    async grabar() {
      await this.call_grabar_transa_ingsal({
        fe_regist: date.formatDate(timeStamp, "YYYY-MM-DD"),
        co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
        il_unineg: "OP",
        ti_ingsal: "2",
        co_empres: "19",
        co_almace: "1",
        no_coment: "COMENTARIO DE INGRESO O SALIDA",
        nu_docume: "OP",
        co_arcadj: "XXXX"
      });
    },
    async cerrar() {
      this.$q.loading.show();
      await this.call_listar_produc_operac_salida({
        fe_regdes: "",
        fe_reghas: "",
        co_operac: "",
        co_plaveh: "",
        il_despac: "OP"
      });
      this.$store.commit("almacen/dialogSalidaOP", false);
      this.$q.loading.hide();
    }
  },
  async created() {
    this.$q.loading.show();

    this.$q.notify({
      message: "Creando"
    });
    console.log("DialogBuscarOperacion.vue");
    this.$q.loading.hide();
  }
};
</script>
