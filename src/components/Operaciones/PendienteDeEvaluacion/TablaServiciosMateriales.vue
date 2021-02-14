<template>
  <div class="">
    <q-table
      title="Servicios"
      :data="get_lista_sermat_evalua.sermat"
      :columns="columns"
      dense
      row-key="name"
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      class="my-sticky-header-table"
    >
      <template v-slot:body-cell-ca_uniaju="props">
        <q-td :props="props">
          <q-input
            style="width: 100px; height: 34px"
            dense
            filled
            bg-color="grey"
            v-model="props.row.ca_uniaju"
            type="text"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-im_preori="props">
        <q-td :props="props">
          <q-input
            style="width: 100px; height: 34px"
            dense
            filled
            bg-color="grey"
            v-model="props.row.im_preori"
            type="text"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-opcion="props">
        <q-td :props="props">
          <q-select
            dense
            style="width: 100px"
            v-model="props.row.opcion"
            :options="options"
            option-label="name"
            option-value="value"
            emit-value
            map-options
            bg-color="grey"
            filled
          />
        </q-td>
      </template>
    </q-table>
    <div class="row">
      <div class="col text-center q-pa-md q-gutter-md">
        <q-btn
          color="primary"
          @click="recalcular"
          icon="cached"
          label="Recalcular"
        />
        <q-btn
          color="secondary"
          @click="confirmar"
          icon="check"
          label="Confirmar Opcion"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("operaciones", ["get_lista_sermat_evalua"]),
  },
  data() {
    return {
      cantidad: "",
      preciounitario: "",
      model: "",
      options: [
        {
          name: "Aceptar",
          value: "A",
        },
        {
          name: "Rechazar",
          value: "R",
        },
        {
          name: "Espera",
          value: "E",
        },
      ],
      columns: [
        {
          name: "name",
          required: true,
          label: "Operacion",
          align: "left",
          field: (row) => row.co_operac,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "co_plaveh",
          align: "left",
          label: "Vehiculos",
          field: "co_plaveh",
          sortable: true,
        },
        {
          name: "co_opeser",
          label: "Codigo",
          align: "left",
          field: "co_opeser",
          sortable: true,
        },
        {
          name: "no_servic",
          align: "left",
          label: "Descripcion",
          field: "no_servic",
        },
        {
          name: "no_tipser",
          align: "left",
          label: "Familia",
          field: "no_tipser",
        },
        {
          name: "ca_uniaju",
          align: "center",
          label: "cantidad",
          field: "ca_uniaju",
        },
        {
          name: "im_preori",
          align: "center",
          label: "P.U",
          field: "im_preori",
          sortable: true,
        },
        {
          name: "va_totaju",
          label: "P.T",
          align: "left",
          field: "va_totaju",
          sortable: true,
        },
        {
          name: "no_tipser",
          label: "Tipo de Item",
          align: "left",
          field: "no_tipser",
          sortable: true,
        },
        {
          name: "no_estado",
          label: "Estado",
          align: "left",
          field: "no_estado",
          sortable: true,
        },
        {
          name: "opcion",
          label: "Opcion",
          field: "opcion",
          align: "right",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_evalua_item_sermat",
      "call_recalcula_sermat",
      "call_lista_sermat_evalua",
      "call_lista_operaci_evalua",
    ]),
    async confirmar() {
      this.$q.loading.show();
      for (
        let index = 0;
        index < this.get_lista_sermat_evalua.sermat.length;
        index++
      ) {
        const element = this.get_lista_sermat_evalua.sermat[index];
        console.log(element);
        this.call_evalua_item_sermat({
          ser_mat: `${element.co_opeser}`,
          cod_ope: `${element.co_operac}`,
          tip_ser: `${element.ti_servic}`,
          tip_opc: `${element.opcion}`,
          cod_per: this.$q.localStorage.getAll().UserDetalle.co_person,
        });
      }
      // await this.call_lista_sermat_evalua(
      //   this.get_lista_sermat_evalua.sermat[0].co_operac
      // );
      await this.call_lista_operaci_evalua({
        nom_cli: "",
        pla_veh: "",
      });
      this.$q.loading.hide();
      this.$store.commit("operaciones/operacionesid3", false);
    },
    async recalcular() {
      this.$q.loading.show();
      for (
        let index = 0;
        index < this.get_lista_sermat_evalua.sermat.length;
        index++
      ) {
        const element = this.get_lista_sermat_evalua.sermat[index];
        // console.log(element);
        await this.call_recalcula_sermat({
          ser_mat: `${element.co_opeser}`,
          cod_ope: `${element.co_operac}`,
          tip_ser: `${element.ti_servic}`,
          cantida: `${element.ca_uniaju}`,
          imp_uni: `${element.im_preori}`,
        });
      }
      await this.call_lista_sermat_evalua(
        this.get_lista_sermat_evalua.sermat[0].co_operac
      );
      this.$q.loading.hide();
    },
  },
};
</script>
<style>
</style>
