<template>
  <div>
    <!--    {{ get_rep_kardex }}-->
    <!--    {{ info }}-->
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Chapa tu moto taxi Precalificados - Activación"
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
              label="Documentar"
              @click="documentar(props.row)"
            />
            <q-btn
                size="xs"
                round
                icon="visibility"
                color="info"
                @click="verarchivos(props.row)"
              />
            <q-btn
              size="xs"
              color="primary"
              label="Activación"
              @click="gestionar(props.row)"
            />
          </div>
        </q-td>
      </template>

    </q-table>
    
    <!-- INICIO DE GENERAR EL POP UP PARA LA GESTIÓN -->
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
            <div class="col-12">
              <q-input
                filled
                dense
                v-model="fecha_activa"
                hint="Fecha de Activación"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha_activa" mask="YYYY-MM-DD">
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
            <div class="col-12">
              <q-input
                filled
                dense
                v-model="fecha_desembolso"
                hint="Fecha de Desembolso"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha_desembolso" mask="YYYY-MM-DD">
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
          
          <!--
          <div class="row">
            <div class="col-xs-12 col-sm-12 q-pa-xs">
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
          </div> -->
        </q-card-section>


        <q-card-actions align="right">
          <q-btn outline label="Cancelar" color="red" @click="cerrar" />
          <q-btn outline label="procesar" color="green" @click="onSubmit" />
        </q-card-actions>

      </q-card>
    </q-dialog>
    <q-dialog v-model="visor">
      <q-card>
        <div v-for="item in arcadjs">
          <a :href="item.url" target="_blank">{{ item.url }}</a>
        </div>

        <!--        {{ arcadjs }}-->
      </q-card>
    </q-dialog>
    <!-- FIN DEL POP UP PARA GESTIONAR -->

    <!-- INICIO DE ADJUNTAR DOCUMENTO -->
    <q-dialog
      v-model="confirm2"
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
            <div class="col-xs-12 col-sm-12 q-pa-xs">
              <q-select
                v-model="tcdocumeactivapre"
                :options="get_tcdocumeactivapre.resultado"
                option-value="ti_docume"
                option-label="no_docume"
                emit-value
                map-options
                label="Tipo de Documento"
                outlined  
                stack-label
                dense
              />
            </div>
          </div>
          <div class="col-12">
            <q-uploader
              auto-upload
              :url="urlimagen"
              label="Adjuntar Archivo"
              color="primary"
              text-color="black"
              no-thumbnails
              class="full-width"
              @uploaded="uploaded"
            />
        </div>
        </q-card-section>
        <!-- @uploaded="uploaded" -->

        <q-card-actions align="right">
          <q-btn outline label="Cancelar" color="red" @click="cerrar" />
          <q-btn outline label="Adjuntar" color="green" @click="adddocume" />
        </q-card-actions>

      </q-card>
    </q-dialog>
    <!-- FIN DE ADJUNTAR DOCUMENTOS-->
    
    
    
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
  name: "Tablaprecal",
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
      "get_tcproduc",
      "get_tctippla",
      "get_tcentida",
      "get_tcdocume",
      "get_tcafirma",
      "get_tcaprrec",
      "get_tcdocumeactivapre",
      
    ]),
    foo: {
      get() {
        return this.dataEdit;
      },
      set(value) {
        this.$store.commit("main/foo", value);
      }
    },
    urlimagen() {
      return `${process.env.Imagen_URL}/upload`;
    },

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
      arcadjs: "",
      visor: false,
      data_visor: "",
      upload: false,
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
      tcproduc: "",
      tctippla: "",
      tcdocume: "",
      tcafirma: "",
      tcaprrec: "",
      tcdocumeactivapre: "",
      tcentida: "",
      ca_arcadj: "",
      clietneSelect: [],
      fecha_desembolso: "",
      fecha_activa: "",
      fechacita: "",
      model: "",
      options: ["asd", "zxc"],
      text: "asd",
      confirm: false,
      confirm2: false,
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
      columns: [
        {
          name: "accion",
          label: "Accion",
          field: "accion",
          sortable: true
        }  

      ],
      data: [],
    };
  },
  methods: {
    ...mapActions("landing", [
      "call_insert_arcadj",
      "call_update_landin",
      "call_tctiplan",
      "call_tcestlla",
      "call_tcestdoc",
      "call_tcexpsis",
      "call_tcvalcvr",
      "call_tcrescvr",
      "call_tcresges",
      "call_tcresult",
      "call_listar_bitaco",
      "call_listar_landin",
      "call_listar_landin_result",
      "call_tcproduc",
      "call_tctippla",
      "call_tcdocume",
      "call_tcafirma",
      "call_tcaprrec",
      "call_tcdocumeactivapre",
      "call_tcentida",
      "call_listar_arcadj_landin"
    ]),
    async verarchivos(val) {
      try {
        let URLS = [];
        console.log(val);
        //console.log(clietneSelect.val);
        // co_tradoc
        console.log(val.CodLanding);
        const archivo = await this.call_listar_arcadj_landin({
          co_landin: val.CodLanding
        });
        console.log("archivo",archivo);
        const array = archivo.operac;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          console.log(element);
          const conteo = `${element.co_arcadj}`;
          const conteoNuevo = conteo.length;
          console.log("conteo", conteo.length);
          console.log("elemento", element);
          if (conteoNuevo > 7) {
            console.log(`${process.env.Imagen_URL}/files/${element.co_arcadj}`);
            URLS.push({
              url: `${process.env.Imagen_URL}/files/${element.co_arcadj}`
            });
          } else {
            console.log(
              `http://sistema.reinventing.com.pe/image?co_archiv=${element.co_arcadj}`
            );
            URLS.push({
              url: `http://sistema.reinventing.com.pe/image?co_archiv=${element.co_arcadj}`
            });
          }
        }
        this.arcadjs = URLS;
        this.visor = true;
      } catch (e) {
        console.log(e);
        this.$q.notify({
          message: "Intente en otro momento"
        });
      }
    },
    async arcadj(val) {
      this.$store.commit("example/UploadBasicData", val);
      this.select_to_arca = val;
      console.log("arcadj", val);
      this.upload = true;
    },
    
    uploaded(files) {
      console.log("subio");
      console.log(files);
      const response = JSON.parse(files.xhr.response).name;
      this.$q.notify({
        message: response
      });
      console.log(response);
      this.$store.commit("example/arcadj", response);
    },
    titulos(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    /*
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
    },*/
    
    async onSubmit() {
      try {
        const resp = await this.call_update_landin({
          co_landin: this.clietneSelect.CodLanding,
          co_produc: null,
          co_entida: null,
          co_tippla: null,
          il_exacvr: null,
          ti_estcvr: null,
          il_comite: null,
          ti_estcmt: null,
          es_carapr: null,
          fe_activa: this.fecha_activa,
          fe_desemb: this.fecha_desembolso
        });

        this.$q.notify({
          message: `${JSON.stringify(resp.message)}`,
        });
        
        await this.call_listar_landin_result({
          fe_regdes: date.formatDate(timeStamp, "YYYY-MM-DD"),
          fe_reghas: date.formatDate(timeStamp, "YYYY-MM-DD"),
          co_person : this.$q.localStorage.getAll().UserDetalle.co_person,
          ti_landin: "1",
          ti_estado: "4",
        });
        
        this.cerrar();
        // this.confirm = false;
      } catch (error) {
        console.log(error);
      }
    },

    async adddocume() {
      try {
        const resp = await this.call_insert_arcadj({
          co_landin: this.clietneSelect.CodLanding,
          ti_docume: this.tcdocumeactivapre ? this.tcdocumeactivapre : null,
          co_arcadj: this.$store.state.example.arcadj,
          ti_accion: "I"
        });

        this.$q.notify({
          message: `${JSON.stringify(resp.message)}`,
        });
        
        await this.call_listar_landin_result({
          fe_regdes: date.formatDate(timeStamp, "YYYY-MM-DD"),
          fe_reghas: date.formatDate(timeStamp, "YYYY-MM-DD"),
          co_person : this.$q.localStorage.getAll().UserDetalle.co_person,
          ti_landin: "1",
          ti_estado: "4",
        });
        
        this.cerrar();
        // this.confirm = false;
      } catch (error) {
        console.log(error);
      }
    },
    async arcadj(val) {
      this.$store.commit("example/UploadBasicData", val);
      this.select_to_arca = val;
      console.log("arcadj", val);
      this.upload = true;
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
        await this.call_tctippla();
        await this.call_tcproduc();
        //await this.call_tcdocume();
        await this.call_tcentida();
        this.confirm = true;
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
      }
    },
    
    async documentar(val) {
      try {
        this.$q.loading.show();
        console.log(val);
        this.clietneSelect = val;
        // await this.call_tctiplan();
        await this.call_tcdocumeactivapre();
        this.confirm2 = true;
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
      this.tcproduc = "";
      this.tctippla = "";
      this.tcentida = "";
      this.confirm = false;
      this.confirm2 = false;
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