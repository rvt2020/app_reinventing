<template>
  <div>
    <!-- {{info}} -->
    <!-- {{ selected }} -->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      :data="info"
      dense
      :filter="filter"
      :columns="columns"
      row-key="co_opeser"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
      selection="single"
      :selected.sync="selected"
    >
      <template v-slot:top-right>
        <q-input
          dense
          filled
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-left>
        <div class="row">
          <div class="col text-h5">
            {{
              selected[0]
                ? `Operacion selecionada: ${selected[0].no_operac}`
                : "Listado"
            }}
          </div>
        </div>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props" @click="selecionar(props)" class="cursor-pointer">
          {{ props.value }}
        </q-td>
      </template>
      <template v-slot:bottom>
        <div class="row q-gutter-lg">
          <div class="col">
            <q-btn
              color="green"
              @click="inicioOperacion"
              size="sm"
              style="width: 80px"
              label="Inicio"
            />
          </div>
          <div class="col">
            <q-btn
              color="red"
              style="width: 80px"
              @click="finOperacion"
              size="sm"
              label="Fin"
            />
          </div>
        </div>
      </template>
    </q-table>
    <q-dialog
      v-model="operacionesid3"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      full-height
      full-width
    >
      <!-- <DialogGenerarOperacion /> -->
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
    info: {
      type: Array,
    },
  },
  computed: {
    ...mapState("operaciones", ["operacionesid3"]),
    ...mapGetters("operaciones", ["get_lista_sermat_evalua"]),
  },
  components: {
    // DialogGenerarOperacion: () => import("./DialogGenerarOperacion"),
  },
  data() {
    return {
      selected: [],
      filter: "",
      maximizedToggle: false,
      initialPagination: {
        sortBy: "no_operac",
        descending: true,
        page: 1,
        rowsPerPage: 1000,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha de Registro",
          align: "left",
          field: (row) => row.fe_regist,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "no_operac",
          label: "Operacion",
          field: "no_operac",
          align: "left",
          sortable: true,
        },
        {
          name: "co_plaveh",
          align: "left",
          label: "Placa",
          field: "co_plaveh",
        },
        {
          name: "no_tecnic",
          align: "left",
          label: "Tecnico",
          field: "no_tecnic",
        },
        {
          name: "no_ordser",
          label: "Orden Servicio",
          field: "no_ordser",
          align: "left",
          sortable: true,
        },
        {
          name: "no_descri",
          label: "Descripcion",
          field: "no_descri",
          align: "left",
          sortable: true,
        },
        {
          name: "no_unimed",
          label: "Unidad Media",
          field: "no_unimed",
          align: "left",
          sortable: true,
        },
        {
          name: "no_tipser",
          label: "Tipo Servicio",
          field: "no_tipser",
          align: "left",
          sortable: true,
        },
        {
          name: "fe_inipro",
          label: "Inicio",
          field: "fe_inipro",
          align: "left",
          sortable: true,
        },
        {
          name: "fe_finpro",
          label: "Fin",
          field: "fe_finpro",
          align: "left",
          sortable: true,
        },
        {
          name: "check",
          label: "Check",
          field: "check",
          align: "left",
          sortable: true,
        },
        // {
        //   name: "accion",
        //   label: "Accion",
        //   field: "accion",
        //   sortable: true,
        // },
      ],
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_combo_cliente",
      "call_lista_vehiculo_ingreso",
      "call_nueva_operacion",
      "call_lista_sermat_evalua",
      "call_iniciar_servicio_ordser",
      "call_finalizar_servicio_ordser",
      "call_lista_opeser_ini_fin",
    ]),
    selecionar(val) {
      //   console.log(val.row.co_operac);
      //   console.log(this.selected.length);
      if (this.selected.length == 0) {
        this.selected = [val.row];
      } else {
        if (val.row.co_operac == this.selected[0].co_operac) {
          this.selected = [];
        } else {
          this.selected = [val.row];
        }
      }
    },
    async generarOperacion(val) {
      this.$q.loading.show();
      await this.call_lista_sermat_evalua(val.co_operac);
      // await this.call_combo_cliente();
      // await this.call_lista_vehiculo_ingreso(val.co_aduana);
      console.log(val);
      this.$q.notify({
        message: `${val.co_operac}`,
      });
      this.$store.commit("operaciones/operacionesid3", true);
      this.$q.loading.hide();
    },
    async inicioOperacion() {
      this.$q.loading.show();
      console.log(this.selected[0]);
      try {
        if (this.selected[0] != undefined) {
          await this.call_iniciar_servicio_ordser({
            ord_ser: `${this.selected[0].co_ordser}`,
            ope_ser: `${this.selected[0].co_opeser}`,
          });
          await this.call_lista_opeser_ini_fin({
            cod_ope: "",
            pla_veh: "",
            tec_aut: "",
          });
          this.selected = [];
          this.$q.loading.hide();
        } else {
          console.log(error);
          this.$q.notify({
            message: "Debe seleccionar una operacion antes",
          });
          this.$q.loading.hide();
        }
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
      }
    },
    async finOperacion() {
      this.$q.loading.show();
      console.log(this.selected[0]);
      try {
        if (this.selected[0] != undefined) {
          await this.call_finalizar_servicio_ordser({
            ord_ser: `${this.selected[0].co_ordser}`,
            ope_ser: `${this.selected[0].co_opeser}`,
          });
          await this.call_lista_opeser_ini_fin({
            cod_ope: "",
            pla_veh: "",
            tec_aut: "",
          });
          this.selected = [];
          this.$q.loading.hide();
        } else {
          console.log(error);
          this.$q.notify({
            message: "Debe seleccionar una operacion antes",
          });
          this.$q.loading.hide();
        }
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
      }
    },
  },
};
</script>
<style>
.q-table__bottom {
  justify-content: center;
}
</style>
