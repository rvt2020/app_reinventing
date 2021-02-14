<template>
  <q-page padding>
    <div>
      <Titulos
        icon="directions_car"
        color="green"
        @click="boton"
        titulo="Vehiculos"
      />
    </div>
    <q-separator color="green" />
    <!--    {{ filtrosNuevos }}-->
    <div id="filtros">
      <div class="row q-gutter-xs q-pt-md q-px-md">
        <div class="col-12 col-md">
          <q-input
            color="white"
            dense
            filled
            v-model="findID"
            label="Buscar por ID"
          />
        </div>
        <div class="col-12 col-md">
          <q-input
            color="white"
            dense
            filled
            v-model="keyword"
            label="Buscar por Placa"
          />
        </div>
        <div class="col-12 col-md">
          <q-select
            color="white"
            filled
            clearable
            dense
            v-model="statuss"
            :options="filtro1_unique"
            label="Marca"
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
            label="Modelo"
          >
          </q-select>
        </div>
        <div class="col-12 col-md">
          <q-select
            color="white"
            filled
            clearable
            dense
            v-model="mobils"
            :options="filtro3_unique"
            label="Año"
          >
          </q-select>
        </div>
        <!--        <div class="col-12 col-md">-->
        <!--          <q-btn @click="exportarData()" color="green-10" class="full-width">-->
        <!--            Exportar-->
        <!--          </q-btn>-->
        <!--        </div>-->
      </div>
    </div>
    <!--    <div align="center">-->
    <!--      <Filtros />-->
    <!--    </div>-->
    <div align="center">
      <TablaFiltro
        order="co_vehicu"
        color="green"
        tool="vehiculos"
        @click="boton"
        :info="filteredByAll"
        :columns="columns"
        paginas="15"
        :exportar="true"
        gridactivate="false"
      />
    </div>
    <div>
      <!--      {{ getVehiculos }}-->
      <!--      <TablaFiltro-->
      <!--        order="co_vehicu"-->
      <!--        color="green"-->
      <!--        tool="vehiculos"-->
      <!--        @click="boton"-->
      <!--        :info="filteredByAll"-->
      <!--        :columns="columns"-->
      <!--        paginas="15"-->
      <!--        :exportar="false"-->
      <!--        gridactivate="false"-->
      <!--      />-->
    </div>
    <!--    <div v-if="activarCrear">-->
    <!--    <div v-if="$store.state.vehiculos.dialogCrear">-->
    <!--      <DialogCrear :tipo="tipo" :info="dataEdit" />-->
    <!--    </div>-->
    <div>
      <DialogCrear :tipo="tipo" :info="dataEdit" />
    </div>
    <!-- content -->
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { FiltrosVehioculos } from "../mixins/FiltrosVehiculos";

export default {
  name: "PageVehiculos",
  mixins: [FiltrosVehioculos],
  data() {
    return {
      tipo: 1,
      dataEdit: {},
      dialogCrear: false,
      activarCrear: false,
      dialog: false,
      columns: [
        {
          name: "co_vehicu",
          align: "left",
          label: "ID",
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
          name: "no_marveh",
          align: "left",
          label: "Marca",
          field: "no_marveh",
          sortable: true
        },
        {
          name: "no_modveh",
          align: "left",
          label: "Modelo",
          field: "no_modveh",
          sortable: true
        },
        {
          name: "nu_anofab",
          align: "left",
          label: "Año",
          field: "nu_anofab",
          sortable: true
        },
        {
          name: "no_colveh",
          align: "left",
          label: "Color",
          field: "no_colveh",
          sortable: true
        },
        {
          name: "action",
          align: "right",
          label: "Acciones",
          field: "action",
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters("vehiculos", ["getVehiculos"])
  },
  components: {
    Filtros: () => import("../components/Filtros"),
    Titulos: () => import("../components/Titulos"),
    TablaFiltro: () => import("../components/Vehiculos/TablaFiltro"),
    DialogCrear: () => import("../components/Vehiculos/Crear")
  },
  methods: {
    ...mapActions("vehiculos", ["callVehiculos"]),
    exportarData() {
      this.$q.notify({
        message: "Por definir :)"
      });
    },
    boton(val) {
      // console.log("Boton en Vehiculos");
      this.tipo = val;
      if (val === 1) {
        // console.log("Boton en Vehiculos 1");
        // this.dialogCrear = true;
        // console.log("se preciono el boton");
        this.$store.commit("vehiculos/dialogCrear", true);
      } else if (val === 2) {
        this.dataEdit = this.$store.state.vehiculos.dataEdit;
        // console.log("Boton en Vehiculos 2");
        // this.dialogCrear = true;
        // console.log("se preciono el boton");
        this.$store.commit("vehiculos/dialogCrear", true);
      }
    }
  },
  async created() {
    this.$q.loading.show();
    this.$store.commit("example/location", "Vehiculos");
    await this.callVehiculos("all");
    this.filtrosNuevos;
    this.$q.loading.hide();
  }
};
</script>
