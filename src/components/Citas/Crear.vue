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
            <div class="text-h5">Citar</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-form @submit.prevent="onSubmit" @reset.prevent.stop="onResert">
          <q-card-section class="row items-center q-gutter-sm">
            <!-- CLIENTE A CITAR -->
            <div class="col-12"> <!-- class="col-xs-12 col-md-6 q-pa-xs" -->
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Cliente</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Documento de Identidad</td>
                      <td class="text-right">
                        <!--                        {{ clienteSelect }}-->
                        <q-select
                          v-if="seleccliente"
                          filled
                          dense
                          @input="buscarPersonas"
                          v-model="clienteSelect"
                          clearable
                          use-input
                          hide-selected
                          fill-input
                          input-debounce="0"
                          label="Dni/CE"
                          :options="options"
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
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-select>
                        <q-input v-else filled dense v-model="doc_ide">
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Paterno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_pat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Materno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_mat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Nombre del Cliente</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nom_cli" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <!-- TELEFONO DEL CLIENTE -->
            <div class="col-12">
              <q-input
                dense
                ref="telefono"
                filled
                v-model="telefono"
                label="Telefono *"
                hint="Ingrese el teléfono"
                maxlength="9"
                counter
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            
            <!-- DATOS DEL VEHICULO -->
            
           <div class="col-12">  <!-- class="col-xs-12 col-md-6 q-pa-xs" -->
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Vehículo</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Placa o VIN</td>
                      <td class="text-right">
                        <q-select
                          v-if="selecvehiculo"
                          filled
                          dense
                          @input="buscarVehiculos"
                          v-model="vehiculoSelect"
                          clearable
                          use-input
                          hide-selected
                          fill-input
                          input-debounce="0"
                          label="Placa"
                          :options="options"
                          option-label="co_plaveh"
                          emit-value
                          map-options
                          @filter="filterFnv"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="selecvehiculo = !selecvehiculo"
                            />
                          </template>
                        </q-select>
                        <q-input v-else filled dense v-model="pla_veh">
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="selecvehiculo = !selecvehiculo"
                            />
                          </template>
                        </q-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Marca</td>
                      <td class="text-right">
                        <!-- <q-input filled dense v-model="mar_veh" /> -->
                        <q-select
                          filled
                          dense
                          @input="traerModelos"
                          v-model="mar_veh"
                          :options="getMarcas"
                          option-label="no_marveh"
                          option-value="co_marveh"
                          emit-value
                          map-options
                          label="Marca"
                          hint="Ingresa Marca"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Modelo</td>
                      <td class="text-right">
                        <!-- <q-input filled dense v-model="mod_veh" /> -->
                        <q-select
                          filled
                          dense
                          v-model="mod_veh"
                          :options="getModelosFilterMarca"
                          option-label="no_modveh"
                          option-value="co_modveh"
                          emit-value
                          map-options
                          label="Modelo"
                          hint="Ingresa tu Modelo"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Color</td>
                      <td class="text-right">
                        <q-input filled dense v-model="col_veh" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <!--
            <div class="col-12">
              <q-input
                dense
                ref="placa"
                filled
                v-model="placa"
                label="Placa *"
                hint="Ingrese la placa"
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
                hint="Color"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            -->
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
    ...mapGetters("operaciones", ["get_combo_cliente"]),
    ...mapGetters("citas", ["get_combo_vehiculo"]),
    ...mapGetters("marcas", ["getMarcas"]),
    ...mapGetters("citas", ["getCitasTipos"]),
    ...mapGetters("personas", ["getPersonasFilter"]),
    ...mapGetters("vehiculos", ["getVehiculosFilter"]),
    ...mapGetters("modelos", ["getModelosFilter", "getModelosFilterMarca"])
  },
  name: "CreaCitas",
  data() {
    return {
      date: "2019-02-01 12:44",
      mostrarFormulario: true,
      fechaCita: date.formatDate(timeStamp, "YYYY-MM-DD HH:mm"),
      //options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      loadboton: false,
      seleccliente: true,
      selecvehiculo: true,
      username: "",
      dni: "",
      clienteSelect: null,
      vehiculoSelect: null,
      options: [],
      newoptions: [],
      optionsv: [],
      newoptionsv: [],
      password: "",
      nombres: "",
      nom_cli: "",
      col_veh: "",
      ape_pat: "",
      ape_mat: "",
      pla_veh: "",
      mar_veh: "",
      mod_veh: "",
      col_veh: "",
      modelo: "",
      marca: "",
      placa: "",
      telefono: "",
      color: "",
      tipodetrabajo: ""
    };
  },
  methods: {
    ...mapActions("operaciones", [
        "call_ingreso_vehicular",
        "call_combo_cliente"]
      ),
    ...mapActions("marcas", ["callMarcas"]),
    ...mapActions("modelos", ["callModelosFilter", "callModelosFilterMarca"]),
    ...mapActions("citas", [
        "callCitasAdd", 
        "callCitas", 
        "callCitasTipoCitas", 
        "call_combo_vehiculo"]
      ),
    ...mapActions("personas", ["callPersonasFilter"]),
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
      this.doc_ide = "";
      this.ape_pat = "";
      this.ape_mat = "";
      this.nom_cli = "";
      this.telefono = "";
      this.pla_veh = "";
      this.mod_veh = "";
      this.col_veh = "";
      this.tipodetrabajo = "";
    },
    async onSubmit() {
      this.loadboton = true;
      try {
        const responseAddCitas = await this.callCitasAdd({
          co_usuari: 1,
          co_docide: this.doc_ide,
          no_apepat: this.ape_pat,
          no_apemat: this.ape_mat,
          no_nombre: this.nom_cli,
          nu_telefo: this.telefono,
          co_plaveh: this.pla_veh,
          co_modveh: this.mod_veh,
          no_colveh: this.col_veh,
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
    },
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
          v => v.no_person.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterFnv(val, update, abort) {
      let asdv = [];
      for (let index = 0; index < this.newoptionsv.length; index++) {
        const elementv = this.newoptionsv[index];
        if (elementv.da_vehicu) {
          asdv.push(elementv);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options = asdv.filter(
          v => v.da_vehicu.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    
    async buscarPersonas() {
      this.doc_ide = this.clienteSelect.co_docide;
      this.ape_pat = this.clienteSelect.no_apepat;
      this.ape_mat = this.clienteSelect.no_apemat;
      this.nom_cli = this.clienteSelect.no_nombre;
    },
    async buscarVehiculos() {
      this.pla_veh = this.vehiculoSelect.co_plaveh;
      this.mar_veh = this.vehiculoSelect.no_marveh;
      this.mod_veh = this.vehiculoSelect.no_modveh;
      this.col_veh = this.vehiculoSelect.no_colveh;
    }
  },
  
  async created() {
    this.$q.loading.show();
    console.log("mounted - crear - Citas");
    await this.call_combo_cliente();
    this.options = this.get_combo_cliente.client;
    this.newoptions = this.get_combo_cliente.client;
    
    await this.call_combo_vehiculo();
    this.optionsv = this.get_combo_vehiculo.vehicu;
    this.newoptionsv = this.get_combo_vehiculo.vehicu;
    
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
    this.$q.notify({
      message: "Crear Cita"
    });
    // this.mostrarFormulario = true;
  }
};
</script>

<style scoped></style>
