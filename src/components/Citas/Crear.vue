<template>
  <div>
    <q-dialog v-model="$store.state.citas.dialogCrear" position="top">
      <!--    <q-dialog v-model="dialogCrear" persistent position="top">-->
      <q-card
        v-if="$store.state.citas.dialogCrear"
        style="width: 700px; max-width: 80vw"
      >
        <q-card-section class="row items-center">
          <div>
            <div class="text-h5">Agregar Citas</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-form @submit.prevent="onSubmit" @reset.prevent.stop="onResert">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                dense
                ref="dni"
                filled
                v-model="dni"
                label="Documento"
                hint="Ingresa tu Documento"
                maxlength="11"
                counter
                :rules="[val => (val && val.length >= 8) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="nombres"
                filled
                v-model="nombres"
                label="Apellidos y Nombres *"
                hint="Ingresa nombre de usuario"
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="telefono"
                filled
                v-model="telefono"
                label="Telefono *"
                hint="Ingresa nombre de usuario"
                maxlength="9"
                counter
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="placa"
                filled
                v-model="placa"
                label="Placa *"
                hint="Ingresa nombre de usuario"
                maxlength="6"
                counter
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                @input="traerModelos"
                v-model="marca"
                :options="getMarcas"
                option-label="no_marveh"
                option-value="co_marveh"
                emit-value
                map-options
                label="Marca"
                hint="Ingresa Marca"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="modelo"
                :options="getModelosFilterMarca"
                option-label="no_modveh"
                option-value="co_modveh"
                emit-value
                map-options
                label="Modelo"
                hint="Ingresa tu Modelo"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="color"
                filled
                v-model="color"
                label="Color *"
                hint="Ingresa nombre de usuario"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <div class="">
                <q-input filled v-model="date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="date"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-12 col-md-6">
                  <q-date
                    v-model="fechaCita"
                    mask="YYYY-MM-DD HH:mm"
                    color="negative"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-time
                    v-model="fechaCita"
                    mask="YYYY-MM-DD HH:mm"
                    color="negative"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <!-- {{ getCitasTipos }} -->
              <q-select
                filled
                dense
                v-model="tipodetrabajo"
                :options="getCitasTipos"
                option-label="no_tipope"
                option-value="co_tipope"
                emit-value
                map-options
                label="Tipo de Trabajo"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" @click="cerrarDialogCrear" outline
              >Cerrar</q-btn
            >
            <q-btn color="warning" type="reset" outline>reset</q-btn>
            <q-btn color="positive" type="submit" :loading="loadboton" outline
              >Guardar
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { date } from "quasar";
let timeStamp = Date.now();
// let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss')
export default {
  computed: {
    ...mapState("citas", ["dialogCrear"]),
    ...mapGetters("marcas", ["getMarcas"]),
    ...mapGetters("citas", ["getCitasTipos"]),
    ...mapGetters("modelos", ["getModelosFilter", "getModelosFilterMarca"])
  },
  name: "CreaCitas",
  data() {
    return {
      date: "2019-02-01 12:44",
      mostrarFormulario: true,
      fechaCita: date.formatDate(timeStamp, "YYYY-MM-DD HH:mm"),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      loadboton: false,
      username: "",
      dni: "",
      password: "",
      nombres: "",
      ape_pat: "",
      ape_mat: "",
      modelo: "",
      marca: "",
      placa: "",
      telefono: "",
      color: "",
      tipodetrabajo: ""
    };
  },
  methods: {
    ...mapActions("marcas", ["callMarcas"]),
    ...mapActions("modelos", ["callModelosFilter", "callModelosFilterMarca"]),
    ...mapActions("citas", ["callCitasAdd", "callCitas", "callCitasTipoCitas"]),
    cerrarDialogCrear() {
      this.$store.commit("citas/dialogCrear", false);
    },
    async traerModelos(val) {
      console.log("Buscando modelos");
      await this.callModelosFilterMarca(val);
    },
    async onResert() {
      this.dni = "";
      this.nombres = "";
      this.telefono = "";
      this.placa = "";
      this.modelo = "";
      this.color = "";
      this.marca = "";
      this.fechaCita = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
    },
    async onSubmit() {
      this.loadboton = true;
      try {
        const responseAddCitas = await this.callCitasAdd({
          co_usuari: 1,
          co_docide: this.dni,
          no_person: this.nombres,
          nu_telefo: this.telefono,
          co_plaveh: this.placa,
          co_modveh: this.modelo,
          no_colveh: this.color,
          fe_progra: this.fechaCita,
          co_tipope: this.tipodetrabajo
        });
        console.log("responseAddCitas", responseAddCitas);
        if (responseAddCitas.res == "ok") {
          this.loadboton = false;
          this.onResert();
          this.$q.notify({
            message: responseAddCitas.message
          });
          this.callCitas("all");
          this.$store.commit("citas/dialogCrear", false);
        } else if (responseAddCitas.res == "ko") {
          this.loadboton = false;
          this.$q.notify({
            message: `${responseAddCitas.message} - verifique los campos`
          });
        }

        // this.q$.notify({
        //   message: responseAddCitas
        // });
      } catch (e) {
        this.loadboton = false;
        this.onResert();
        this.$q.notify({
          message: "Error controlado"
        });
        console.log("se paso, en el excel");
      }
      // }
    }
  },
  async created() {
    this.$q.loading.show();
    console.log("mounted - crear - Citas");
    if (this.tipo == 2) {
      // await this.callPersonasFilter(this.dataEdit.co_plaveh);
      // console.log("this.getPersonasFilter", this.dataEdit);
      // this.co_vehicu = this.dataEdit.co_vehicu;
      // this.placa = this.dataEdit.co_plaveh;
      // this.marca = Number(this.dataEdit.co_marveh);
      // this.modelo = this.dataEdit.co_modveh;
      // this.anio = this.dataEdit.nu_anofab;
      // this.chasis = this.dataEdit.nu_serveh;
      // this.motor = this.dataEdit.nu_motveh;
      // this.color = this.dataEdit.no_colveh;
      await this.callMarcas("all");
      await this.callCitasTipoCitas();
      this.mostrarFormulario = true;
      this.$q.loading.hide();
    } else if (this.tipo == 1) {
      await this.callCitasTipoCitas();
      await this.callMarcas("all");
      this.mostrarFormulario = true;
      this.$q.loading.hide();
    }
    await this.callCitasTipoCitas();
    await this.callMarcas("all");
    this.$q.loading.hide();
    // this.mostrarFormulario = true;
  }
};
</script>

<style scoped></style>
