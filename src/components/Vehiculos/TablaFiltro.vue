<template>
  <div class="q-pa-md">
    <q-card>
      <q-table
        dense
        :data="info"
        :hide-header="mode === 'grid'"
        :columns="columns"
        :row-key="order"
        :grid="mode == 'grid'"
        :filter="filter"
        :loading="loadtable"
        :pagination.sync="pagination"
        virtual-scroll
        class="my-sticky-header-table"
        color="primary"
        card-class="bg-green-1 text-brown"
        table-header-class="text-brown"
        title="Lista de Vehiculos"
      >
        <template v-slot:top-right="props">
          <q-input
            filled
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{
                props.inFullscreen
                  ? "Sair Pantalla completa"
                  : "Pantalla completa"
              }}
            </q-tooltip>
          </q-btn>
          <q-btn
            v-if="exportar"
            color="primary"
            icon-right="archive"
            label="Exportar"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body-cell-detail="props">
          <q-td :props="props">
            <q-btn
              size="sm"
              @click="employee_dialogActive(props.row)"
              dense
              round
              color="secondary"
              icon="pageview"
            />
          </q-td>
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <q-tooltip
              v-if="tool == 'vehiculos'"
              :content-class="`bg-${color}`"
              content-style="font-size: 12px"
              :offset="[10, 10]"
            >
              Motor: {{ props.row.nu_motveh }} <br />
              Chasis: {{ props.row.nu_serveh }}
            </q-tooltip>
            {{ props.value }}
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                dense
                size="sm"
                @click="editar(props.row)"
                color="warning"
                icon="edit"
              />
              <q-btn
                dense
                size="sm"
                @click="generarOperacion(props.row)"
                color="primary"
                label="Ingresar"
              />
              
            </div>
          </q-td>
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Nada que mostrar... </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="employee_dialog">
      <q-card class="my-card" style="width: 100%" flat bordered>
        <q-card-section>
          <div class="text-h5">
            Detalle del Usuario
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <!--        {{ data_employee_dialog }}-->
        <q-card-section
          horizontal
          class="justify-between"
          style="height: 140px"
        >
          <q-card-section class="q-pt-xs">
            <div class="text-h6 q-mt-sm q-mb-xs">
              {{ data_employee_dialog.no_nombre }}
              <span class="text-caption q-pb-md">
                {{ data_employee_dialog.no_apepat }}
                {{ data_employee_dialog.no_apemat }}</span
              >
            </div>
            <div class="text-caption text-grey">
              DNI | {{ data_employee_dialog.co_docide }} <br />
              Usuario | {{ data_employee_dialog.no_usuari }} <br />
            </div>
          </q-card-section>
          <q-card-section class="col-3">
            <q-img class="rounded-borders" :src="fotoPerfil" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-section>
          Codigo de Usuario | {{ data_employee_dialog.co_usuari }}
        </q-card-section>
      </q-card>
    </q-dialog>


    <div v-if="dialogEdit">
      <DialogEdit :tipo="tipo" :info="dataEdit" />
    </div>

  </div>
</template>

<script>
import { exportFile } from "quasar";
import { date } from "quasar";
let timeStamp = Date.now();
import { mapActions, mapGetters, mapState } from "vuex";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  props: [
    "info",
    "columns",
    "paginas",
    "exportar",
    "color",
    "order",
    "tool",
    "loadtable"
  ],
  components: {
    DialogEdit: () => import("./Editar")
  },
  computed: {
    ...mapState("vehiculos", ["dialogEdit"]),
    fotoPerfil() {
      // https://cdn.quasar.dev/img/boy-avatar.png
      if (this.data_employee_dialog.co_fotper) {
        return `${process.env.Imagen_URL}/${this.data_employee_dialog.co_fotper}`;
      } else {
        return `https://cdn.quasar.dev/img/boy-avatar.png`;
      }
    }
  },
  data() {
    return {
      tipo: 2,
      dataEdit: {},
      filter: "",
      mode: "list",
      invoice: {},
      data_employee_dialog: {},
      employee_dialog: false,
      pagination: {
        sortBy: this.order,
        descending: true,
        page: 1,
        rowsPerPage: 1000
      }
    };
  },
  methods: {
    generarOperacion(val) {
      this.$store.commit("example/dataIngresoVehicular", val);
      this.$store.commit("example/dialogIngresoVehicular", true);
    },
    employee_dialogActive(val) {
      console.log(val);
      this.data_employee_dialog = val;
      this.employee_dialog = true;
    },
    editar(val) {
      this.dataEdit = val;
      // this.$store.commit("vehiculos/dataEdit", val);
      this.$store.commit("vehiculos/dialogEdit", true);
      // this.$emit("click", 2);
      // console.log(val);
      this.$q.notify({
        message: val.co_plaveh
      });
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.info.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile(
        `vehiculos_${date.formatDate(timeStamp, "YYYY_MM_DD_HH_mm")}.csv`,
        content,
        "text/csv"
      );

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    }
  }
};
</script>
<style>
.q-chip__content {
  display: block;
  text-align: center;
}
</style>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 70vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */

  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
