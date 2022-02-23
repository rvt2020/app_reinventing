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
      
      no_emisor: "enviacorreos@reinventing.com.pe",
      no_recept: [
        "jose.bobadilla@reinventing.com.pe",
        "julio.mazuelos@reinventing.com.pe",
        "ada.mazuelos@reinventing.com.pe",
        "norma.cortavitarte@reinventing.com.pe",
        "jose.mazuelos@reinventing.com.pe",
        "joseph.carrion@reinventing.com.pe"
        ],
      no_asunto: "Eminitir VB - Facturación de Vehículo",
      no_mensaj: "Generar Factura del vehículo",

      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha de Registro",
          align: "center",
          field: (row) => row.fe_regist,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "no_operac",
          label: "Operacion",
          field: "no_operac",
          align: "center",
          sortable: true,
        },
        {
          name: "co_plaveh",
          align: "center",
          label: "Placa",
          field: "co_plaveh",
        },
        {
          name: "no_marveh",
          align: "left",
          label: "Marca",
          field: "no_marveh",
        },
        {
          name: "no_modveh",
          align: "left",
          label: "Modelo",
          field: "no_modveh",
        },
        {
          name: "no_colveh",
          align: "left",
          label: "Color",
          field: "no_colveh",
        },
        {
          name: "co_docide",
          align: "left",
          label: "DNI/RUC",
          field: "co_docide",
        },
        {
          name: "no_client",
          align: "left",
          label: "Cliente",
          field: "no_client",
        },
        {
          name: "co_ordser",
          label: "OS",
          field: "co_ordser",
          align: "center",
          sortable: true,
        },
        {
          name: "no_ordser",
          label: "Orden Servicio",
          field: "no_ordser",
          align: "center",
          sortable: true,
        },
        {
          name: "co_opeser",
          label: "TR",
          field: "co_opeser",
          align: "left",
          sortable: true,
        },
        {
          name: "no_descri",
          label: "Trabajo",
          field: "no_descri",
          align: "left",
          sortable: true,
        },
        {
          name: "fe_inipro",
          label: "Inicio",
          field: "fe_inipro",
          align: "center",
          sortable: true,
        },
        {
          name: "fe_finpro",
          label: "Fin",
          field: "fe_finpro",
          align: "center",
          sortable: true,
        },
        {
          name: "co_tecnic",
          label: ".",
          field: "co_tecnic",
          align: "center",
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
    ...mapActions("correos", ["call_envia_correo"]),
    
    selecionar(val) {
      //   console.log(val.row.co_operac);
      //   console.log(this.selected.length);
      // <!--`Buen día.<br><br>Se requiere realizar la factura de la operación ${this.co_operac}.<br><br>Gracias`
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

          if (this.selected[0].co_tecnic != 0) {
            await this.call_envia_correo(
              {
                  "de": this.no_emisor,
                  "para": this.no_recept,
                  "asunto": this.no_asunto,
                  "mensaje": this.no_mensaj,
                  "html": `
                    Buen día.<br><br>
                    Se requiere realizar la factura de la operación ${this.selected[0].no_operac}.<br><br>
                    Placa : ${this.selected[0].co_plaveh}.<br>
                    Marca : ${this.selected[0].no_marveh}.<br>
                    Modelo : ${this.selected[0].no_modveh}.<br>
                    Color : ${this.selected[0].no_colveh}.<br>
                    DNI/RUC : ${this.selected[0].co_docide}.<br>
                    Cliente : ${this.selected[0].no_client}.<br><br>
                    Motivo : ${this.selected[0].no_descri}.<br><br>
                    Gracias`
                }
            );
          }

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
