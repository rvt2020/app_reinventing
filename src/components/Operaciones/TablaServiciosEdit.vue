<template>
  <div class="q-pa-xs">
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      dense
      :columns="columns"
      :title="titulo"
      :data="info"
      row-key="name"
      :pagination="pagination"
      :hide-header="hideheader"
    >
      <template v-slot:body-cell-ca_uniori="props">
        <q-td :props="props">
          <q-input
            class="inputnuevo"
            style="height: 10px"
            dense
            filled
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            v-model="props.row.ca_uniori"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-im_preori="props">
        <q-td :props="props">
          <!--          <input style="width: 44px" type="text">-->
          <q-input
            class="inputnuevo"
            style="height: 10px"
            dense
            filled
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            v-model="props.row.im_preori"
          />
        </q-td>
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
      <template v-slot:top-right>
        <q-btn
          size="sm"
          color="orange"
          icon-right="autorenew"
          label="Actualizar"
          @click="actualziarServicios()"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { MixinDefault } from "../../mixins/mixin";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [MixinDefault],
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
      text: "",
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
          name: "co_opeser",
          align: "left",
          label: "Codigo",
          field: "co_opeser",
          sortable: true
        },
        {
          name: "no_tiptra",
          align: "left",
          label: "Tipo de Trabajo",
          field: "no_tiptra",
          sortable: true
        },
        {
          name: "no_servic",
          align: "left",
          label: "Descripcion",
          field: "no_servic",
          sortable: true
        },
        {
          name: "no_unimed",
          align: "left",
          label: "U.M",
          field: "no_unimed",
          sortable: true
        },
        {
          name: "familia",
          align: "left",
          label: "Familia",
          field: "familia",
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
          name: "va_totori",
          align: "left",
          label: "Precio Total",
          field: "va_totori",
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
          name: "va_totaju",
          align: "left",
          label: "Precio Total",
          field: "va_totaju",
          sortable: true
        },
        {
          name: "no_estado",
          align: "left",
          label: "Estado",
          field: "no_estado",
          sortable: true
        },
        {
          name: "no_tipser",
          align: "right",
          label: "Tipo de Servicio",
          field: "no_tipser",
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
      "call_serv_mater_mostrar_buscar"
    ]),
    async eliminar(val) {
      this.$q.loading.show();
      console.log(val);
      await this.call_delete_servic_opera({
        ope_ser: val.co_opeser,
        cod_ope: val.co_operac
      });
      await this.call_serv_mater_mostrar_buscar({
        cod_ope: this.$store.state.operaciones.numeroDeOperacion,
        tip_fil: "S"
      });
      this.$q.loading.hide();
    },
    async actualziarServicios() {
      this.$q.loading.show();
      // console.log(this.info);
      for (let i = 0; i < this.info.length; i++) {
        const element = this.info[i];
        console.log(element);
        await this.call_servic_opera({
          cod_ope: `${element.co_operac}`,
          ope_ser: `${element.co_opeser}`,
          cantida: `${element.ca_uniori}`,
          imp_uni: `${element.im_preori}`
        });
      }
      await this.$emit("click");
      console.log("Actualziar");
      this.$q.loading.hide();
    }
  },
  async created() {}
};
</script>

<style>
.q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
  /*height: 25px;*/
  /*background-color: red;*/
}

.inputnuevo {
  /*background-color: red;*/
  height: 25px;
}
</style>
