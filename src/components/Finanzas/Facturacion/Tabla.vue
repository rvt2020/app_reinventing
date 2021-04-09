<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Lista de Facturas"
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
        <q-btn color="primary" label="Facturar" @click="crearFactura"></q-btn>

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
              label="Detalle"
              @click="generarOperacion(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <div>
      <DialogCrear :tipo="tipo" :info="dataEdit" />
    </div>
    
    <q-dialog
      v-model="dialogDetalleFactur"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-up"
      full-height
      full-width
    >
      <DialogGenerarOperacion />
    </q-dialog>

    
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
                v-model="fe_emisio"
                hint="Fecha de Emisión"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fe_emisio" mask="YYYY-MM-DD">
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
          </div>

          <div class="row">   
            <div class="col-xs-12 col-sm-6 q-pa-xs">
                <q-select
                    v-model="tctipdoc"
                    :options="get_catalogo_tctipdoc.operac"
                    option-label="no_docume"
                    option-value="ti_docume"
                    map-options
                    emit-value
                    label="Tipo de Documento"
                    outlined
                    stack-label
                    dense
                />
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
            <div class="col-xs-12 col-sm-12 q-px-sm">
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
  
  computed: {
    ...mapState("finanzas", ["dialogCrear", "dialogDetalleFactur"]),
    ...mapGetters("finanzas", [
        "get_listar_factur",
        "get_catalogo_tcclient",
        "get_catalogo_tctipdoc",
        "get_inform_factur",
        "get_listar_operac_encont",
        "get_listar_detall_factur",
      ]),
    ...mapGetters("operaciones", ["get_combo_cliente",]),
    
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

  components: {
    DialogGenerarOperacion: () => import("./DialogDetalleFactur"),
    DialogCrear: () => import("./NuevaFactur")
  },
  
  data() {
    return {
      loadboton: false,
      maximizedToggle: true,
      options: [],
      newoptions: [],
      maximizedToggle: false,
      dialogver: false,
      fe_emisio: "",
      tctipdoc: "",
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
    ...mapActions("operaciones", ["call_combo_cliente",]),
    ...mapActions("finanzas", [
        "call_insert_factur", 
        "call_listar_factur", 
        "call_catalogo_tctipdoc",
        "call_inform_factur",
        "call_listar_operac_encont",
        "call_listar_detall_factur",
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
        //console.log(this.clienteSelect);
        //console.log(this.clienteSelect);
        //console.log(this.clienteSelect);
        //console.log(this.clienteSelect);
        //console.log(this.clienteSelect);
        //console.log(this.clienteSelect);

        const resp = await this.call_insert_factur({
          pn_regist: this.$q.localStorage.getAll().UserDetalle.co_person,
          fe_emisio: this.fe_emisio,
          ti_docume: this.tctipdoc,
          nu_docume: this.nu_docume,
          co_person: this.clienteSelect,
        });
        this.$q.notify({
          message: `${JSON.stringify(resp.message)}`,
        });
        await this.call_listar_factur({
            fe_regdes: "",
            fe_reghas: "",
            no_client: "",
            nu_factur: "",
            co_operac: "",
        });
        this.cerrar();
        // this.confirm = false;
      } catch (error) {
        console.log(error);
      }
    },
    //async crearFactura() {
    //  console.log("Crear Factura");
    //  this.$store.commit("finanzas/dialogCrear", true);
    //},
    
    async crearFactura(val) {
      try {
        this.$q.loading.show();
        console.log(val);
        this.clietneSelect = val;
        await this.call_catalogo_tctipdoc(); 
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

    async generarOperacion(val) {
      this.$q.loading.show();

      console.log(this.codigo);
      
      this.$store.commit("finanzas/factura", val.co_factur);
      await this.call_inform_factur({
        co_factur: `${val.co_factur}`
      });
      await this.call_listar_operac_encont({
        co_factur: `${val.co_factur}`,
        co_operac: "",
        co_plaveh: "",
        no_client: ""
      });
      await this.call_listar_detall_factur({
        co_factur: `${val.co_factur}`
      });
      
      console.log(val);
      this.$q.notify({
        message: `${val.co_factur}`
      });
      this.$store.commit("finanzas/dialogDetalleFactur", true);
      this.$q.loading.hide();
    }, 

    cerrar() {
      // this.clietneSelect = {};
      this.tctipdoc = "";
      this.nu_docume = "";
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