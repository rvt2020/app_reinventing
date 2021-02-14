<template>
  <div class="q-pa-xs">
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      dense
      :title="titulo"
      :data="info"
      :columns="columns"
      row-key="name"
      :pagination="pagination"
      :hide-header="hideheader"
    >
      <template v-slot:top-right>
        <q-btn
          size="sm"
          color="orange"
          icon-right="autorenew"
          label="Actualizar"
          @click="actualizarMateriales"
        />
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <!--          <input style="width: 44px" type="text">-->
          <q-btn
            rounded
            size="sm"
            color="red"
            icon="delete"
            @click="eliminar(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    info: {
      type: Array,
      default: function() {
        return [];
      }
    },
    titulo: {
      type: String
    },
    hideheader: {
      type: Boolean
    },
    hidebottom: {
      type: Boolean
    }
  },
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 8
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "co_operac",
          align: "left",
          label: "Operacion",
          field: "co_operac",
          sortable: true
        },
        {
          name: "co_vehicu",
          align: "left",
          label: "Vehiculo",
          field: "co_vehicu",
          sortable: true
        },
        {
          name: "co_plaveh",
          align: "left",
          label: "Placa",
          field: "co_plaveh",
          sortable: true
        },
        {
          name: "co_opemat",
          align: "left",
          label: "co_opemat",
          field: "co_opemat",
          sortable: true
        },
        {
          name: "no_articu",
          align: "left",
          label: "Descripcion",
          field: "no_articu",
          sortable: true
        },
        {
          name: "co_materi",
          align: "left",
          label: "co_materi",
          field: "co_materi",
          sortable: true
        },
        {
          name: "no_materi",
          align: "left",
          label: "Nombre",
          field: "no_materi",
          sortable: true
        },
        {
          name: "ca_uniori",
          align: "left",
          label: "Cantidad",
          field: "ca_uniori",
          sortable: true
        },
        {
          name: "im_preori",
          align: "left",
          label: "Precio Unitario",
          field: "im_preori",
          sortable: true
        },
        {
          name: "im_totori",
          align: "left",
          label: "Precio Total",
          field: "im_totori",
          sortable: true
        },
        {
          name: "ca_uniaju",
          align: "left",
          label: "Cantidad",
          field: "ca_uniaju",
          sortable: true
        },
        {
          name: "im_preaju",
          align: "left",
          label: "Precio Unitario",
          field: "im_preaju",
          sortable: true
        },
        {
          name: "im_totaju",
          align: "left",
          label: "Precio Total",
          field: "im_totaju",
          sortable: true
        },
        {
          name: "no_estmat",
          align: "left",
          label: "Estado",
          field: "no_estmat",
          sortable: true
        },
        {
          name: "il_costos",
          align: "right",
          label: "Tipo de Servicio",
          field: "il_costos",
          sortable: true
        },
        {
          name: "accion",
          align: "right",
          label: "Accion",
          field: "accion",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_servic_opera",
      "call_delete_servic_opera",
      "call_delete_materi_opera",
      "call_serv_mater_mostrar_buscar"
    ]),
    actualizarMateriales() {
      console.log("Se preciono agregarServiciosMateriales");
      this.$emit("click");
    },
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_delete_materi_opera({
        ope_mat: val.co_opemat,
        cod_ope: val.co_operac
      });
      await this.call_serv_mater_mostrar_buscar({
        cod_ope: this.$store.state.operaciones.numeroDeOperacion,
        tip_fil: "M"
      });
      this.$q.loading.hide();
    }
  }
};
</script>

<style scoped></style>
