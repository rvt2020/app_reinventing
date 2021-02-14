<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Resultado del Reporte Diario"
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
import { MixinDefault } from "../../../../mixins/mixin";
export default {
  props: {
    info: {
      type: Array,
      default: () => []
    }
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
          ...this.ObjKeyRename(element, this.labels)
        });
      }
      // console.log("asdasdasd", data);
      return data;
    }
  },
  data() {
    return {
      filter: "",
      tipo: 1,
      orden: null,
      dataEdit: [],
      maximizedToggle: false,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "co_descri",
          label: "Codigo",
          align: "left",
          field: "co_descri"
        },
        {
          name: "no_descri",
          label: "Descripcion",
          align: "left",
          field: "no_descri"
        },
        {
          name: "fe_actual",
          label: "Fecha",
          align: "left",
          field: "fe_actual"
        },
        {
          name: "ca_rechaz",
          label: "Cant. Rechazo",
          align: "left",
          field: "ca_rechaz"
        },
        {
          name: "im_rechaz",
          label: "Imp. Rechazo",
          align: "left",
          field: "im_rechaz"
        },
        {
          name: "un_rechaz",
          label: "Prom. Rechazo",
          align: "left",
          field: "un_rechaz"
        },
        {
          name: "ca_penide",
          label: "Cantidad pendiente",
          align: "left",
          field: "ca_penide"
        },
        {
          name: "im_pendie",
          label: "Imp. Pendiente",
          align: "left",
          field: "im_pendie"
        },
        {
          name: "un_pendie",
          label: "Prom. Pendiente",
          align: "left",
          field: "un_pendie"
        },
        {
          name: "ca_autori",
          label: "Cantidad autorizada",
          align: "left",
          field: "ca_autori"
        },
        {
          name: "im_autori",
          label: "Imp. Autorizado",
          align: "left",
          field: "im_autori"
        },
        {
          name: "un_autori",
          label: "Prom Autorizado",
          align: "left",
          field: "un_autori"
        },
        {
          name: "ca_proces",
          label: "Cant. Proceso",
          align: "left",
          field: "ca_proces"
        },
        {
          name: "im_proces",
          label: "Imp. Proceso",
          align: "left",
          field: "im_proces"
        },
        {
          name: "un_proces",
          label: "Prom. Proceso",
          align: "left",
          field: "un_proces"
        },
        {
          name: "ca_cerrad",
          label: "Cant. Cerrado",
          align: "left",
          field: "ca_cerrad"
        },
        {
          name: "im_cerrad",
          label: "Imp. Cerrado",
          align: "left",
          field: "im_cerrad"
        },
        {
          name: "un_cerrad",
          label: "Prom. Cerrado",
          align: "left",
          field: "un_cerrad"
        },
        {
          name: "ca_totale",
          label: "Cantidad total",
          align: "left",
          field: "ca_totale"
        },
        {
          name: "im_totale",
          label: "Imp. Total",
          align: "left",
          field: "im_totale"
        },
        {
          name: "un_totale",
          label: "Prom. Total",
          align: "left",
          field: "un_totale"
        },
        {
          name: "ca_dispon",
          label: "Cant. Disponible",
          align: "left",
          field: "ca_dispon"
        },
        {
          name: "im_dispon",
          label: "Imp. Disponible",
          align: "left",
          field: "im_dispon"
        },
        {
          name: "un_dispon",
          label: "Prom. Disponible",
          align: "left",
          field: "un_dispon"
        }
      ]
    };
  },

  methods: {
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    asdasd(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped></style>
