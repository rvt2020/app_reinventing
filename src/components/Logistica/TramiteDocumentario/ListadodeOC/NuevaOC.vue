<template>
  <div>
    <q-dialog v-model="dialogCrear" persistent position="top">
      <q-card v-if="mostrarFormulario" style="width: 700px; max-width: 80vw">
        <div class="q-pl-lg">
          <div v-if="tipo == 1" class="text-h6">Agregar T/D</div>
          <div v-else-if="tipo == 2" class="text-h6">Editar Articulo</div>
        </div>
        <!--        {{ get_catalogo_tcsolici }}-->
        <q-separator />
        <q-form @submit="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                filled
                dense
                v-model="fechadetramite"
                hint="Fecha de Orden"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fechadetramite" mask="YYYY-MM-DD">
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
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="proveedor"
                :options="get_catalogo_tcprovee.operac"
                option-label="no_razsoc"
                option-value="co_perjur"
                emit-value
                map-options
                label="Proveedor"
                hint="Proveedor"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="solicitante"
                :options="get_catalogo_tcsolici.operac"
                option-label="no_solici"
                option-value="co_solici"
                emit-value
                map-options
                label="Solicitante"
                hint="Solicitante"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="tipodedocumento"
                :options="get_catalogo_tctipdoc.operac"
                option-label="no_docume"
                option-value="ti_docume"
                emit-value
                map-options
                label="Tipo de Documento"
                hint="Tipo de Documento"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="motivodetramite"
                filled
                dense
                label="Motivo de compra"
                hint="Motivo de compra"
                type="textarea"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="moneda"
                :options="get_catalogo_tcmoneda.operac"
                option-label="no_moneda"
                option-value="co_moneda"
                emit-value
                map-options
                label="Moneda"
                hint="Moneda"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="conigv"
                :options="optionsIGV"
                option-value="value"
                option-label="name"
                map-options
                emit-value
                label="¿Con IGV?"
                hint="¿Con IGV?"
              />
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
          <q-card-actions align="right">
            <q-btn color="negative" @click="cerrarDialogCrearUser" outline
              >Cerrar
            </q-btn>
            <q-btn color="warning" type="reset" outline>reset</q-btn>
            <q-btn color="positive" type="submit" :loading="loadboton" outline
              >Registrar</q-btn
            >
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapState("tramites", ["dialogCrear"]),
    ...mapGetters("tramites", [
      "get_catalogo_tcprovee",
      "get_catalogo_tctipdoc",
      "get_catalogo_tcmoneda",
      "get_catalogo_tcsolici"
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
    }
  },
  name: "CreaVehiculos",
  data() {
    return {
      fechadetramite: "2021-01-06",
      options: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.4"],
      optionsIGV: [
        {
          name: "SI",
          value: 1
        },
        {
          name: "NO",
          value: 2
        }
      ],
      options2: this.getMaterialesCategorias,
      tipo: 1,
      dataEdit: [],
      solicitante: "",
      tipodedocumento: "",
      motivodetramite: "",
      moneda: "",
      tipopago: "",
      conigv: "",
      proveedor: "",
      empresa: null,
      categoria: null,
      mostrarFormulario: false,
      loadboton: false,
      placa: "",
      marca: "",
      co_arcadj: null,
      modelo: "",
      versioncar: "",
      anio: "",
      color: "",
      chasis: "",
      co_vehicu: "",
      motor: ""
    };
  },
  methods: {
    ...mapActions("tramites", [
      "call_insert_tradoc",
      "call_catalogo_tcprovee",
      "call_catalogo_tctipdoc",
      "call_catalogo_tcmoneda",
      "call_listar_tradoc",
      "call_catalogo_tcsolici"
    ]),
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
    filterFn(val, update, abort) {
      let asd = [];
      for (
        let index = 0;
        index < this.getMaterialesCategorias.length;
        index++
      ) {
        const element = this.getMaterialesCategorias[index];
        if (element.no_catego) {
          asd.push(element);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options2 = asd.filter(
          v => v.no_catego.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async traerCategorias() {
      await this.callMaterialesCategorias(this.empresa);
    },
    cerrarDialogCrearUser() {
      this.$store.commit("tramites/dialogCrear", false);
      // this.$store.commit("tramites/activarEdit", false);
    },
    async onResert() {
      this.fechadecompra;
      this.empresa;
      this.categoria;
    },
    async onSubmit() {
      this.loadboton = true;
      try {
        const responseService = await this.call_insert_tradoc({
          pn_regist: this.$q.localStorage.getAll().UserDetalle.co_person,
          pn_solici: `${this.solicitante}`,
          co_perjur: `${this.proveedor}`,
          co_moneda: `${this.moneda}`,
          de_mottra: `${this.motivodetramite}`,
          fe_tradoc: `${this.fechadetramite}`,
          il_conigv: `${this.conigv}`,
          ti_docume: `${this.tipodedocumento}`,
          co_arcadj: `${this.$store.state.example.arcadj}`
        });
        console.log("responseService", responseService);
        if (responseService.res == "ok") {
          this.loadboton = false;
          this.onResert();
          this.$q.notify({
            message: responseService.message
          });
          await this.call_listar_tradoc({
            fe_emides: "",
            fe_emihas: "",
            no_provee: "",
            nu_tramit: "",
            co_barras: ""
          });
          this.$store.commit("tramites/dialogCrear", false);
        } else if (responseService.res == "ko") {
          this.loadboton = false;
          this.$q.notify({
            message: `${responseService.message} - verifique los campos`
          });
        }
      } catch (e) {
        this.loadboton = false;
        this.onResert();
        this.$q.notify({
          message: `${e} - Error controlado`
        });
        console.log(e);
      }
      // }
    }
  },
  async mounted() {
    console.log("se ejecuto el mount");
    this.$q.loading.show();
    this.call_catalogo_tcprovee();
    this.call_catalogo_tctipdoc();
    this.call_catalogo_tcmoneda();
    this.call_catalogo_tcsolici();
    console.log("mounted - crear - materiales");
    // await this.callMaterialesEmpresas();
    this.mostrarFormulario = true;
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
