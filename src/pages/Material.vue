<template>
  <q-page padding>
    <div>
      <Titulos
        icon="list_alt"
        color="indigo"
        @click="boton"
        titulo="Materiales"
      />
    </div>
    <q-separator color="indigo" />
    <div id="filtros">
      <div class="row q-gutter-xs q-pt-md q-px-md">
        <div class="col-12 col-md">
          <q-input
            color="white"
            dense
            filled
            v-model="findID"
            label="Buscar por codigo de barra"
          />
        </div>
        <!--        <div class="col-12 col-md">-->
        <!--          <q-input-->
        <!--            color="white"-->
        <!--            dense-->
        <!--            filled-->
        <!--            v-model="keyword"-->
        <!--            label="Buscar por Placa"-->
        <!--          />-->
        <!--        </div>-->
        <div class="col-12 col-md">
          <q-select
            color="white"
            filled
            clearable
            dense
            v-model="statuss"
            :options="filtro1_unique"
            label="Categoria"
          >
          </q-select>
        </div>
        <div class="col-12 col-md">
          <q-select
            color="white"
            filled
            clearable
            dense
            v-model="citys"
            :options="filtro2_unique"
            label="Empresa"
          >
          </q-select>
        </div>
        <!--        <div class="col-12 col-md">-->
        <!--          <q-btn @click="exportarData()" color="indigo-10" class="full-width">-->
        <!--            Exportar-->
        <!--          </q-btn>-->
        <!--        </div>-->
      </div>
    </div>
    <div v-if="getMateriales" align="center">
      <TablaFiltro
        :loadtable="loadtable"
        order="co_vehicu"
        color="indigo"
        tool="articulo"
        @click="boton"
        :info="filteredByAll"
        :columns="columns"
        paginas="15"
        :exportar="true"
        gridactivate="false"
      />
    </div>
    <div>
      <DialogCrear :tipo="tipo" :info="dataEdit" />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { FiltrosMateriales } from "../mixins/FiltrosMateriales";
export default {
  name: "PageMaterial",
  mixins: [FiltrosMateriales],
  data() {
    return {
      tipo: 1,
      dataEdit: {},
      dialogCrear: false,
      activarCrear: false,
      dialog: false
    };
  },
  computed: {
    ...mapGetters("materiales", ["getMateriales"])
  },
  components: {
    Filtros: () => import("../components/Filtros"),
    Titulos: () => import("../components/Titulos"),
    TablaFiltro: () => import("../components/Materiales/TablaFiltro"),
    DialogCrear: () => import("../components/Materiales/Crear")
  },
  methods: {
    ...mapActions("materiales", ["callMateriales"]),
    exportarData() {
      this.$q.notify({
        message: "Por definir :)"
      });
    },
    boton(val) {
      // console.log("Boton en Materiales");
      this.tipo = val;
      if (val === 1) {
        // console.log("Boton en Materiales 1");
        // this.dialogCrear = true;
        // console.log("se preciono el boton");
        this.$store.commit("materiales/dialogCrear", true);
      } else if (val === 2) {
        this.dataEdit = this.$store.state.materiales.dataEdit;
        // console.log("Boton en Materiales 2");
        // this.dialogCrear = true;
        // console.log("se preciono el boton");
        this.$store.commit("materiales/dialogCrear", true);
      }
    }
  },

  async created() {
    this.$q.loading.show();
    this.$store.commit("example/location", "Materiales");
    await this.callMateriales("all");
    await this.filtrosNuevos;
    this.$q.loading.hide();
  }
};
</script>
