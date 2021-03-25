<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Operaciones Cerradas"
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
              color="primary"
              label="Facturar"
              @click="facturar(props.row)"
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
        <q-card-section>
                <div class="row"> 
                    <div class="col-12">
                  <q-input
                    filled
                    dense
                    v-model="fecha_emision"
                    hint="Fecha de Emisión"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="fecha_emision" mask="YYYY-MM-DD">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-xs">
                    <q-input
                        outlined
                        dense
                        v-model="nu_docume"
                        type="text"
                        stack-label
                        label="Número Documento"
                    />
                </div>  
            </div>
                
            <div class="row"> 
                <div class="col-xs-12 col-sm-9 q-px-sm">
                    <q-select
                    filled
                    v-model="clienteSelect"
                    clearable
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    label="Cliente"
                    :options="options"
                    option-value="co_person"
                    option-label="no_person"
                    emit-value
                    map-options
                    @filter="filterFn"
                    >
                    <template v-slot:no-option>
                        <q-item>
                        <q-item-section class="text-grey">
                            No results
                        </q-item-section>
                        </q-item>
                    </template>
                    </q-select>
                </div> 
            </div>

            <div class="row"> 
                <div class="col-xs-12 col-sm-12 q-pa-xs">
                    <q-input
                        outlined
                        dense
                        autogrow
                        v-model="no_direcc"
                        type="text"
                        stack-label
                        label="Dirección"
                    />
                </div>  
            </div>
            <div class="row"> 
                <div class="col-xs-12 col-sm-6 q-pa-xs">
                    <q-select
                        v-model="tctipdes"
                        :options="get_tctipdes.resultado"
                        option-label="no_tipdes"
                        option-value="co_tipdes"
                        map-options
                        emit-value
                        label="Tipo de Descipción"
                        outlined
                        stack-label
                        dense
                    />
                </div>
                <div class="col-xs-12 col-sm-12 q-pa-xs">
                    <q-input
                        outlined
                        dense
                        autogrow
                        v-model="no_descri"
                        type="text"
                        stack-label
                        label="Descripción (En caso sea general)"
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
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn outline label="Cancelar" color="red" @click="cerrar" />
          <q-btn outline label="Facturar" color="green" @click="onSubmit" />
        </q-card-actions>
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
    ...mapState("operaciones", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("operaciones", [
      "get_listar_cerrad",
      "get_tctipdes",
      "get_combo_cliente",
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
    
  },
  data() {
    return {
      loadboton: false,
      maximizedToggle: true,
      options: [],
      newoptions: [],
      maximizedToggle: false,
      dialogver: false,
      fecha_emision: "",
      tctipdes: "",
      nu_docume: "",
      no_direcc: "",
      no_descri: "",
      no_coment: "",
      co_operac: "",
      co_client: "",
      clietneSelect: [],
      clienteSelect: null,
      
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
    ...mapActions("operaciones", [
      "call_combo_cliente",
      "call_insert_factur",
      "call_listar_cerrad",
      "call_tipo_descripcion",
    ]),
    filterFn(val, update, abort) {
      let asd = [];
      for (let index = 0; index < this.newoptions.length; index++) {
        const element = this.newoptions[index];
        if (element.no_person) {
          asd.push(element);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options = asd.filter(
          (v) => v.no_person.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    async onSubmit() {
      try {
        //console.log(clienteSelect);
        const resp = await this.call_insert_factur({
          pn_regist: this.$q.localStorage.getAll().UserDetalle.co_person,
          fe_emisio: this.fecha_emision,
          nu_docume: this.nu_docume,
          co_docide: this.clietneSelect.Documento,
          no_direcc: this.no_direcc ? this.no_direcc : null,
          ti_descri: this.tctipdes,
          no_descri: this.no_descri ? this.no_descri : null,
          no_coment: this.no_coment ? this.no_coment : null,
          co_operac: this.clietneSelect.Codigo,
        });
        this.$q.notify({
          message: `${JSON.stringify(resp.message)}`,
        });
        await this.call_listar_cerrad({
            co_operac: "",
            co_plaveh: "",
            fe_ciedes: date.formatDate(timeStamp, "YYYY-MM-DD"),
            fe_ciehas: date.formatDate(timeStamp, "YYYY-MM-DD"),
        });
        this.cerrar();
        // this.confirm = false;
      } catch (error) {
        console.log(error);
      }
    },
    async facturar(val) {
      try {
        this.$q.loading.show();
        console.log(val);
        this.clietneSelect = val;
        await this.call_tipo_descripcion(); 
        await this.call_combo_cliente();
        this.options = this.get_combo_cliente.client;
        this.newoptions = this.get_combo_cliente.client;
        
        this.confirm = true;
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
      }
    },
    cerrar() {
      // this.clietneSelect = {};
      this.tctipdes = "";
      this.nu_docume = "";
      this.no_direcc = "";
      this.no_descri = "";
      this.no_coment = "";
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