<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Referidos"
      :data="dataTable"
      dense
      :filter="filter"
      row-key="name"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ titulos(col.label) }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:top-right>
        <q-input
          class="q-pl-sm"
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
      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </template>
      
    </q-table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../mixins/mixin";
import { date } from "quasar";
let timeStamp = Date.now();
export default {
  props: {
    info: {
      type: Array, 
      default: () => [],
    },
  },
  mixins: [MixinDefault],
  name: "Tabla",
  computed: {
    ...mapState("reportes", ["dialogCrear", "dialogDetalleOrden"]),
    dataTable() {
      let data = [];
      console.log("this.info.length", this.info.length);
      for (let index = 0; index < this.info.length; index++) {
        const element = this.info[index];
        data.push({
          ...this.ObjKeyRename(element, this.labels),
          accion: "",
        });
      }
      // console.log("asdasdasd", data);
      return data;
    },
    
  },
  data() {
    return {
      maximizedToggle: false,
      no_client: "",
      fechacita: "",
      model: "",
      options: ["asd", "zxc"],
      text: "asd",
      filter: "",
      tipo: 1,
      orden: null,
      dataEdit: [],
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000,
        // rowsNumber: xx if getting data from a server
      },
      columns: [],
      data: [],
    };
  },
  methods: {
    ...mapActions("reportes", [
      "call_referi_comisi",
    ]),
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>