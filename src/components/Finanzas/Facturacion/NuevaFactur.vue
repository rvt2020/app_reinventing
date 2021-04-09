<template>
  <div>
    <q-dialog v-model="dialogCrear" persistent position="top">
      <q-card v-if="mostrarFormulario" style="width: 700px; max-width: 80vw">
        <div class="q-pl-lg">
          <div v-if="tipo == 1" class="text-h6">Facturar</div>
        </div> 

        <q-separator />
        <q-form @submit="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                filled
                dense
                v-model="fechadefactura"
                hint="Fecha de Emisión"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fechadefactura" mask="YYYY-MM-DD">
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
                v-model="numerodedocumento"
                filled
                dense
                label="Número de Documento"
                hint="Número de Documento"
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
      "get_tctipdoc",
      "get_catalogo_tcmoneda"
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
      fechadefactura: "2021-04-07",
      options: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.4"],
      tipo: 1,
      dataEdit: [],
      cliente: "",
      tipodedocumento: "",
      numerodedocumento: "",
      moneda: "",
      empresa: null,
      categoria: null,
      mostrarFormulario: false,
      loadboton: false
    };
  },
  methods: {
    ...mapActions("finanzas", [
      "call_insert_factur",
      "call_catalogo_tcclient",
      "call_catalogo_tcmoneda",
      "call_listar_factur",
      "call_catalogo_tctipdoc"
    ]),
    
    
    async onSubmit() {
      this.loadboton = true;
      try {
        const responseService = await this.call_insert_factur({
          pn_regist: this.$q.localStorage.getAll().UserDetalle.co_person,
          fe_emisio: this.fechadefactura,
          ti_docume: this.tipodedocumento,
          nu_docume: this.numerodedocumento,
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
    this.call_catalogo_tctipdoc();
    this.call_catalogo_tcmoneda();
    console.log("mounted - NUEVA FACTURA");
    // await this.callMaterialesEmpresas();
    this.mostrarFormulario = true;
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
