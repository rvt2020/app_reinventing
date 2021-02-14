<template>
  <div class="">
    {{ get_lista_sermat_asignar.servic }}
    {{ options }}
    <q-table
      title="Servicios"
      :data="get_lista_sermat_asignar.servic"
      :columns="columns"
      dense
      row-key="name"
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      class="my-sticky-header-table"
    >
      <template v-slot:body-cell-tecnico="props">
        <q-td :props="props">
          <q-select
            dense
            :value="props.row.tecnico"
            v-model="props.row.tecnico"
            style="width: 270px"
            :options="options"
            option-label="no_person"
            option-value="co_tecaut"
            emit-value
            map-options
            bg-color="grey"
            filled
            use-input
            hide-selected
            input-debounce="0"
            @filter="filterFn"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section
                  @click="updateTecnico(scope.opt.co_tecaut, props.row)"
                >
                  <q-item-label v-html="scope.opt.no_person" />
                  <!--                <q-item-label caption>{{ scope.opt.co_tecaut }}</q-item-label>-->
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <!--          </q-popup-edit>-->
        </q-td>
      </template>
    </q-table>
    <div class="row">
      <div class="col text-center q-pa-md q-gutter-md">
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
    ...mapGetters("operaciones", [
      "get_lista_sermat_asignar",
      "get_combo_tecnico"
    ])
  },
  data() {
    return {
      cantidad: "",
      preciounitario: "",
      model: "",
      options: [],
      columns: [
        // {
        //   name: "name",
        //   required: true,
        //   label: "Operacion",
        //   align: "left",
        //   field: (row) => row.co_operac,
        //   format: (val) => `${val}`,
        //   sortable: true,
        // },
        {
          name: "co_plaveh",
          align: "left",
          label: "Vehiculos",
          field: "co_plaveh",
          sortable: true
        },
        {
          name: "tecnico",
          align: "left",
          label: "Tecnico",
          field: "tecnico",
          sortable: true
        },
        {
          name: "co_opeser",
          label: "Codigo",
          align: "left",
          field: "co_opeser",
          sortable: true
        },
        {
          name: "no_servic",
          align: "left",
          label: "Descripcion",
          field: "no_servic"
        },
        {
          name: "no_unimed",
          align: "left",
          label: "Unidad Medida",
          field: "no_unimed"
        },
        {
          name: "no_tipser",
          align: "left",
          label: "Gran Familia",
          field: "no_tipser"
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
          label: "P.U",
          align: "left",
          field: "im_preori",
          sortable: true
        },
        {
          name: "va_totori",
          label: "P.U",
          align: "left",
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
          label: "P.U",
          align: "left",
          field: "im_preaju",
          sortable: true
        },
        {
          name: "va_totaju",
          label: "P.U",
          align: "left",
          field: "va_totaju",
          sortable: true
        },
        {
          name: "no_estado",
          label: "Estado",
          align: "left",
          field: "no_estado",
          sortable: true
        },
        {
          name: "ti_servic",
          label: "Tipo de Servicio",
          field: "ti_servic",
          align: "right",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_evalua_item_sermat",
      "call_recalcula_sermat",
      "call_lista_sermat_evalua",
      "call_lista_operaci_asignar",
      "call_asigna_tecnico_servicio"
    ]),
    filterFn(val, update) {
      let filtroSelect = [];
      for (
        let index = 0;
        index < this.get_combo_tecnico.tecnico.length;
        index++
      ) {
        const element = this.get_combo_tecnico.tecnico[index];
        if (element.no_person) {
          filtroSelect.push(element);
        }
      }
      // console.log("filtroSelect", filtroSelect);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options = filtroSelect.filter(
          v => v.no_person.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    updateTecnico(e, f) {
      console.log(e, f);
      let asd = [];
      const newObject = this.get_lista_sermat_asignar.servic.map(function(
        value,
        label
      ) {
        console.log(value.co_opeser);
        console.log(f.co_opeser);
        if (value.co_opeser == f.co_opeser) {
          asd.push({
            ...value,
            tecnico: e
          });
        } else {
          asd.push({
            ...value
          });
        }
        // return value * value;
      });
      console.log(newObject);
      console.log(asd);
      this.$store.commit("operaciones/set_get_lista_sermat_asignar", asd);
    },
    async confirmar() {
      this.$q.loading.show();
      for (
        let index = 0;
        index < this.get_lista_sermat_asignar.servic.length;
        index++
      ) {
        const element = this.get_lista_sermat_asignar.servic[index];
        console.log(element);
        await this.call_asigna_tecnico_servicio({
          cod_ope: `${element.co_operac}`,
          ope_ser: `${element.co_opeser}`,
          tec_aut: `${element.tecnico}`
        });
      }
      // await this.call_lista_sermat_evalua(
      //   this.get_lista_sermat_asignar.servic[0].co_operac
      // );
      await this.call_lista_operaci_asignar({
        nom_cli: "",
        pla_veh: ""
      });
      this.$q.loading.hide();
      this.$store.commit("operaciones/operacionesid4", false);
    }
  }
};
</script>
<style></style>
