<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Moto lineal"
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
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <div class="q-pr-xs q-gutter-sm">
            <q-btn
              size="xs"
              color="green"
              label="Ver"
              @click="ver(props.row)"
            />

            <q-btn
              size="xs"
              color="primary"
              label="Gestionar"
              @click="gestionar(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog
      v-model="confirm"
      style="width: 100%; max-width: 250px"
      persistent
      position="top"
    >
      <q-card style="width: 600px">
        <!-- <q-card-section class="q-pa-none q-pt-sm q-pl-lg">
          Gestionando: {{ clietneSelect.Nombres }} con Documento:
          {{ clietneSelect.Documento }}
        </q-card-section> -->
        <!-- {{get_tcvalcvr.resultado}} -->
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-select
                v-model="tcestlla"
                :options="get_tcestlla.resultado"
                option-label="no_estlla"
                option-value="co_estlla"
                emit-value
                map-options
                label="Estado de la llamada"
                outlined
                stack-label
                dense
              />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-select
                v-model="tcresges"
                :options="get_tcresges.resultado"
                option-label="no_resges"
                option-value="co_resges"
                map-options
                emit-value
                label="Resultado de la gestion"
                outlined
                stack-label
                dense
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-select
                v-model="tcvalcvr"
                :options="get_tcvalcvr.resultado"
                label="Converus"
                option-label="no_valcvr"
                option-value="ti_valcvr"
                map-options
                emit-value
                outlined
                stack-label
                dense
              />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-select
                v-model="tcestdoc"
                :options="get_tcestdoc.resultado"
                option-label="no_estdoc"
                option-value="co_estdoc"
                emit-value
                map-options
                label="Estado del documento"
                outlined
                stack-label
                dense
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-select
                v-model="tcexpsis"
                :options="get_tcexpsis.resultado"
                option-label="no_expsis"
                option-value="ti_expsis"
                map-options
                emit-value
                label="Expediente del Sistema"
                outlined
                stack-label
                dense
              />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-input
                outlined
                dense
                v-model="co_expedi"
                type="text"
                stack-label
                label="Codigo de expediente"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 q-pa-xs">
              <q-input
                outlined
                dense
                autogrow
                v-model="no_coment"
                type="text"
                stack-label
                label="Comentario"
              />
            </div>
          </div>
          <div class="row" style="place-content: center">
            <div class="col-xs-12 col-sm-6 q-pa-xs" style="text-align: center">
              Fecha cita
              <q-date
                minimal
                mask="YYYY-MM-DD"
                v-model="fechacita"
                title="Fecha"
                subtitle="Cita"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-select
                v-model="tcrescvr"
                :options="get_tcrescvr.resultado"
                option-value="co_rescvr"
                option-label="no_rescvr"
                emit-value
                map-options
                label="Resultado converus"
                outlined
                stack-label
                dense
              />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-xs">
              <q-select
                v-model="tcresult"
                :options="get_tcresult.resultado"
                option-value="co_result"
                option-label="no_result"
                emit-value
                map-options
                label="Resultado de la gestion"
                outlined
                stack-label
                dense
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn outline label="Cancelar" color="red" @click="cerrar" />
          <q-btn outline label="procesar" color="green" @click="onSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogver" persistent full-width>
      <q-card class="bg-primary text-white">
        <q-bar class="bg-primary">
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
              >Minimizar</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
              >Maximizar</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>

        <!-- <q-card-section>
          <div class="text-h6">Historico de Gestion para: Miguel Rodriguez</div>
        </q-card-section> -->

        <q-card-section class="q-pt-none">
          <!-- {{ get_listar_bitaco.resultado }} -->
          <q-table
            dense
            flat
            color="primary"
            card-class="bg-amber-1 text-brown"
            table-class="text-grey-8"
            table-header-class="text-brown"
            title="Bitácora"
            :data="dataTableBitacora"
            row-key="name"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
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
    ...mapGetters("landing", [
      "get_tctiplan",
      "get_tcestlla",
      "get_tcestdoc",
      "get_tcexpsis",
      "get_tcvalcvr",
      "get_tcrescvr",
      "get_tcresges",
      "get_tcresult",
      "get_listar_bitaco",
    ]),
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
    dataTableBitacora() {
      let data = [];
      try {
        console.log(
          "this.info.length",
          this.get_listar_bitaco.resultado.length
        );
        for (
          let index = 0;
          index < this.get_listar_bitaco.resultado.length;
          index++
        ) {
          const element = this.get_listar_bitaco.resultado[index];
          data.push(this.ObjKeyRename(element, this.labels));
        }
        // console.log("asdasdasd", data);
        return data;
      } catch (error) {
        console.log(error);
        return data;
      }
    },
  },
  data() {
    return {
      maximizedToggle: false,
      dialogver: false,
      tcresges: "",
      tcestlla: "",
      tcvalcvr: "",
      tcestdoc: "",
      tcexpsis: "",
      co_expedi: "",
      no_coment: "",
      fechacita: "",
      tcrescvr: "",
      tcresult: "",
      clietneSelect: [],
      fechacita: "",
      model: "",
      options: ["asd", "zxc"],
      text: "asd",
      confirm: false,
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
    ...mapActions("landing", [
      "call_insert_bitges",
      "call_tctiplan",
      "call_tcestlla",
      "call_tcestdoc",
      "call_tcexpsis",
      "call_tcvalcvr",
      "call_tcrescvr",
      "call_tcresges",
      "call_tcresult",
      "call_listar_landin",
      "call_listar_bitaco",
    ]),
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    async ver(val) {
      try {
        this.$q.loading.show();
        console.log(val);
        await this.call_listar_bitaco({
          co_landin: val.CodLanding,
        });
        if (this.get_listar_bitaco.resultado.length > 0) {
          this.dialogver = true;
        } else {
          this.dialogver = false;
          this.$q.notify({
            message: "No tiene gestion",
          });
        }
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "Error controlado",
        });
        this.$q.loading.hide();
      }
    },
    async onSubmit() {
      try {
        const resp = await this.call_insert_bitges({
          co_landin: this.clietneSelect.CodLanding,
          ps_regist: this.$q.localStorage.getAll().UserDetalle.co_person,
          co_estlla: this.tcestlla,
          co_resges: this.tcresges,
          no_coment: this.no_coment,
          co_estdoc: this.tcestdoc,
          ti_expsis: this.tcexpsis,
          co_expedi: this.co_expedi,
          il_conver: this.tcvalcvr,
          fe_citcvr: this.fechacita,
          co_rescvr: this.tcrescvr,
          co_result: this.tcresult,
        });
        this.$q.notify({
          message: `${JSON.stringify(resp.message)}`,
        });
        await this.call_listar_landin({
          fe_regdes: date.formatDate(timeStamp, "YYYY-MM-DD"),
          fe_reghas: date.formatDate(timeStamp, "YYYY-MM-DD"),
          ti_landin: "2",
        });
        this.cerrar();
        // this.confirm = false;
      } catch (error) {
        console.log(error);
      }
    },
    async gestionar(val) {
      try {
        this.$q.loading.show();
        console.log(val);
        this.clietneSelect = val;
        // await this.call_tctiplan();
        await this.call_tcestlla();
        await this.call_tcestdoc();
        await this.call_tcexpsis();
        await this.call_tcvalcvr();
        await this.call_tcrescvr();
        await this.call_tcresges();
        await this.call_tcresult();
        this.confirm = true;
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
      }
    },
    cerrar() {
      // this.clietneSelect = {};
      this.tcestlla = "";
      this.tcresges = "";
      this.no_coment = "";
      this.tcestdoc = "";
      this.tcexpsis = "";
      this.co_expedi = "";
      this.tcvalcvr = "";
      this.fechacita = "";
      this.tcrescvr = "";
      this.tcresult = "";
      this.confirm = false;
    },
  },
  async created() {
    try {
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>