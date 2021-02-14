<template>
  <div>
    <q-table
      dense
      flat
      bordered
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
      title="Datos de Ingreso"
      :data="info"
      :columns="columns"
      :filter="filter"
      row-key="name"
    >
      <template v-slot:top-right>
        <div class="row">
          <div class="q-pa-xs">
            <q-btn color="primary" label="Grabar" @click="grabar" />
          </div>
        </div>
      </template>
      <template v-slot:body-cell-empresa="props">
        <q-td :props="props">
          <q-select
            filled
            dense
            v-model="props.row.empresa"
            :options="get_empresas.empresa"
            option-label="no_empres"
            option-value="co_empres"
            map-options
            emit-value
            label="Empresa"
          >
            <template v-if="props.row.empresa" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop="props.row.empresa = ''"
                class="cursor-pointer"
              />
            </template>
          </q-select>
        </q-td>
      </template>
      <template v-slot:body-cell-almacen="props">
        <q-td :props="props">
          <q-select
            filled
            dense
            v-model="props.row.almacen"
            :options="get_combo_almacen.resultado"
            option-label="no_almace"
            option-value="co_almace"
            map-options
            emit-value
            label="Almacen"
          >
            <template v-if="props.row.almacen" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop="props.row.almacen = ''"
                class="cursor-pointer"
              />
            </template>
          </q-select>
        </q-td>
      </template>
      <template v-slot:body-cell-descripcion="props">
        <q-td :props="props">
          <q-input filled dense v-model="props.row.descripcion" />
        </q-td>
      </template>
      <template v-slot:body-cell-guia="props">
        <q-td :props="props">
          <q-input filled dense v-model="props.row.guia" />
        </q-td>
      </template>
      <template v-slot:body-cell-documento="props">
        <q-td :props="props">
          <q-btn color="primary" icon="attachment" />
        </q-td>
      </template>
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <q-btn color="red" icon="delete" round />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters("reportes", [
      "get_rep_kardex",
      "get_empresas",
      "get_combo_almacen"
    ])
  },
  data() {
    return {
      filter: "",
      initialPagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 1000
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Orden Compra",
          align: "left",
          field: row => row.co_prikey,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "fe_regist",
          align: "center",
          label: "Fecha",
          field: "fe_regist",
          sortable: true
        },
        {
          name: "no_person",
          label: "Usuario",
          field: "no_person",
          sortable: true
        },
        { name: "no_ingsal", label: "Tipo", field: "no_ingsal" },
        { name: "empresa", label: "Empresa", field: "empresa" },
        { name: "almacen", label: "Almacén", field: "almacen" },
        {
          name: "descripcion",
          label: "Descripción",
          field: "descripcion",
          sortable: true
        },
        {
          name: "acciones",
          label: "Acciones",
          field: "acciones",
          sortable: true
        }
      ],

      data: []
    };
  },
  methods: {
    ...mapActions("almacen", [
      "call_grabar_transa_ingsal",
      "call_listar_produc_ordtra_ingres"
    ]),
    ...mapActions("reportes", [
      "call_rep_kardex",
      "call_empresas",
      "call_combo_almacen"
    ]),
    async grabar() {
      this.$q.loading.show();
      console.log("grabar");
      try {
        for (let i = 0; i < this.info.length; i++) {
          const element = this.info[i];
          console.log("element", element);
          await this.call_grabar_transa_ingsal({
            fe_regist: element.fe_regist,
            co_person: this.$q.localStorage.getAll().UserDetalle.co_person,
            il_unineg: "TD",
            ti_ingsal: "1",
            co_empres: "19",
            co_almace: "1",
            no_coment: element.descripcion,
            nu_guirem: "",
            co_arcadj: ""
          });
        }
        // this.$store.commit("almacen/dialogSalidaOP", true);
        this.$q.notify({
          message: "Se grabo correctamente"
        });

        await this.call_listar_produc_ordtra_ingres({
          fe_regdes: "",
          fe_reghas: "",
          no_provee: "",
          nu_ordtra: "",
          co_barras: "",
          il_ordtra: "TD"
        });
        this.$store.commit("almacen/dialogIngresoTD", false);
        this.$q.loading.hide();
      } catch (e) {
        console.log(e);
        this.$q.loading.hide();
      }
    }
  },
  async created() {
    this.$q.loading.show();
    await this.call_combo_almacen();
    await this.call_empresas();
    this.$q.loading.hide();
  }
};
</script>
