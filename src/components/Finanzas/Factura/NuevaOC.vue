<template>
  <div>
    <q-dialog v-model="dialogCrear" persistent position="top">
      <q-card v-if="mostrarFormulario" style="width: 700px; max-width: 80vw">
        <div class="q-pl-lg">
          <div v-if="tipo == 1" class="text-h6">Facturar</div>
          <!--div v-else-if="tipo == 2" class="text-h6">Editar Articulo</div>-->
        </div>

        <q-separator />
        <q-form @submit="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                filled
                dense
                v-model="fechadeemision"
                hint="Fecha de Emisión"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fechadeemision" mask="YYYY-MM-DD">
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
                v-model="numerodocumento"
                filled
                dense
                label="Nro. Documento"
                hint="Nro. Documento"
                type="text"
              />
            </div>
            
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="cliente"
                :options="get_catalogo_tcclient.operac"
                option-label="no_person"
                option-value="co_person"
                emit-value
                map-options
                label="Cliente"
                hint="Cliente"
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
    ...mapState("finanzas", ["dialogCrear"]),
    ...mapGetters("finanzas", [
      "get_catalogo_tcclient",
      "get_catalogo_tctipdoc"
    ]),
    foo: {
      get() {
        return this.dataEdit;
      },
      set(value) {
        this.$store.commit("main/foo", value);
      }
    }
  },
  name: "CreaVehiculos",
  data() {
    return {
      fechadecompra: "2021-01-06",
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
      fechadeemision: "",
      tipodedocumento: "",
      numerodocumento: "",
      cliente: "",
      solicitante: "",
      tipodecompra: "",
      motivodecompra: "",
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
    ...mapActions("finanzas", [
      "call_insert_factur",
      "call_catalogo_tcclient",
      "call_catalogo_tipdoc",
      "call_listar_detall_factur",
      "call_listar_operac_encont",
      "call_listar_factur"
    ]),
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
      this.$store.commit("finanzas/dialogCrear", false);
      // this.$store.commit("logisticas/activarEdit", false);
    },
    async onResert() {
      this.fechadeemision;
      this.tipodedocumento;
    },
    async onSubmit() {
      this.loadboton = true;
      try {
        const responseService = await this.call_insert_factur({
          pn_regist: this.$q.localStorage.getAll().UserDetalle.co_person,
          fe_emisio: this.fechadeemision,
          ti_docume: this.tipodedocumento,
          nu_docume: this.numerodocumento,
          co_client: this.cliente
        });

        console.log("responseService", responseService);
        if (responseService.res == "ok") {
          this.loadboton = false;
          this.onResert();
          this.$q.notify({
            message: responseService.message
          });
          await this.call_listar_factur({
            fe_regdes: "",
            fe_reghas: "",
            no_client: "",
            nu_factur: "",
            ti_estado: "",
            co_operac: ""
          });
          this.$store.commit("finanzas/dialogCrear", false);
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
    this.$q.loading.show();
    this.call_catalogo_tcclient();
    this.call_catalogo_tipdoc();
    console.log("mounted - crear - materiales");
    // await this.callMaterialesEmpresas();
    this.mostrarFormulario = true;
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
