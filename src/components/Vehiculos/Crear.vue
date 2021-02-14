<template>
  <div>
    <q-dialog v-model="dialogCrear" persistent position="top">
      <q-card v-if="mostrarFormulario" style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center">
          <div>
            <div v-if="tipo == 1" class="text-h5">Agregar Vehiculos</div>
            <div v-else-if="tipo == 2" class="text-h5">Editar Vehiculos</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-form @submit="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                dense
                ref="placa"
                filled
                v-model="placa"
                label="Placa"
                hint="Ingresa tu Placa"
                maxlength="6"
                counter
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo obligatorio',
                ]"
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
              <q-select
                filled
                dense
                v-model="versioncar"
                :options="options"
                label="Version"
                hint="Ingresa tu Version"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo obligatorio',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="anio"
                filled
                v-model="anio"
                label="Año *"
                hint="Ingresa Año"
                maxlength="4"
                lazy-rules
                counter
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo obligatorio',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="color"
                filled
                v-model="color"
                label="Color *"
                hint="Ingresa Color"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo obligatorio',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="chasis"
                filled
                v-model="chasis"
                label="Chasis *"
                hint="Ingresa Chasis"
                maxlength="17"
                counter
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length == 17) ||
                    'Campo obligatorio y debe ser igual a 17',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="motor"
                filled
                v-model="motor"
                label="Motor *"
                hint="Ingresa Motor"
                maxlength="12"
                counter
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length == 12) ||
                    'Campo obligatorio y debe ser igual a 12',
                ]"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" @click="cerrarDialogCrearUser" outline
              >Cerrar
            </q-btn>
            <q-btn color="warning" type="reset" outline>reset</q-btn>
            <q-btn color="positive" type="submit" :loading="loadboton" outline
              >Guardar</q-btn
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
  props: ["tipo", "info"],
  computed: {
    ...mapState("vehiculos", ["dialogCrear", "dataEdit"]),
    ...mapGetters("vehiculos", ["getVehiculosFilter"]),
    ...mapGetters("marcas", ["getMarcas"]),
    ...mapGetters("modelos", ["getModelosFilter", "getModelosFilterMarca"]),
    foo: {
      get() {
        return this.dataEdit;
      },
      set(value) {
        this.$store.commit("main/foo", value);
      },
    },
  },
  name: "CreaVehiculos",
  data() {
    return {
      options: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.4"],
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
      motor: "",
    };
  },
  methods: {
    ...mapActions("vehiculos", [
      "callVehiculosAdd",
      "callVehiculos",
      "callVehiculosFilter",
      "callVehiculosUpdate",
    ]),
    ...mapActions("marcas", ["callMarcas"]),
    ...mapActions("modelos", ["callModelosFilter", "callModelosFilterMarca"]),
    async traerModelos(val) {
      console.log("Buscando modelos");
      await this.callModelosFilterMarca(val);
    },
    cerrarDialogCrearUser() {
      this.$store.commit("vehiculos/dialogCrear", false);
      this.$store.commit("vehiculos/activarEdit", false);
    },
    async onResert() {
      this.placa = "";
      this.marca = "";
      this.modelo = "";
      this.anio = "";
      this.chasis = "";
      this.motor = "";
      this.color = "";
    },
    async onSubmit() {
      this.loadboton = true;
      try {
        if (this.tipo == 1) {
          const responseAddUser = await this.callVehiculosAdd({
            co_plaveh: this.placa,
            co_marveh: this.marca,
            co_modveh: this.modelo,
            nu_anofab: this.anio,
            nu_serveh: this.chasis,
            nu_motveh: this.motor,
            no_colveh: this.color,
          });
          console.log("responseAddUser", responseAddUser);
          if (responseAddUser.res == "ok") {
            this.loadboton = false;
            this.onResert();
            this.$q.notify({
              message: responseAddUser.message,
            });
            this.callVehiculos("all");
            this.$store.commit("vehiculos/dialogCrear", false);
          } else if (responseAddUser.res == "ko") {
            this.loadboton = false;
            this.$q.notify({
              message: `${responseAddUser.message} - verifique los campos`,
            });
          }
        } else if (this.tipo == 2) {
          const responseAddUser = await this.callVehiculosUpdate({
            co_vehicu: this.co_vehicu,
            co_plaveh: this.placa,
            co_modveh: this.modelo,
            nu_anofab: this.anio,
            nu_serveh: this.chasis,
            nu_motveh: this.motor,
            no_colveh: this.color,
          });
          console.log("responseAddUser", responseAddUser);
          if (responseAddUser.res == "ok") {
            this.loadboton = false;
            this.onResert();
            this.$q.notify({
              message: responseAddUser.message,
            });
            this.callVehiculos("all");
            this.$store.commit("vehiculos/dialogCrear", false);
          } else if (responseAddUser.res == "ko") {
            this.loadboton = false;
            this.$q.notify({
              message: `${responseAddUser.message} - verifique los campos`,
            });
          }
        }

        // this.q$.notify({
        //   message: responseAddUser
        // });
      } catch (e) {
        this.loadboton = false;
        this.onResert();
        this.$q.notify({
          message: `${e} - Error controlado`,
        });
        console.log(e);
      }
      // }
    },
  },
  async mounted() {
    // this.$q.loading.show();
    console.log("mounted - crear - vehiculos");
    if (this.tipo == 2) {
      // await this.callVehiculosFilter(this.dataEdit.co_plaveh);
      // console.log("this.getVehiculosFilter", this.dataEdit);
      this.co_vehicu = this.dataEdit.co_vehicu;
      this.placa = this.dataEdit.co_plaveh;
      this.marca = Number(this.dataEdit.co_marveh);
      this.modelo = this.dataEdit.co_modveh;
      this.anio = this.dataEdit.nu_anofab;
      this.chasis = this.dataEdit.nu_serveh;
      this.motor = this.dataEdit.nu_motveh;
      this.color = this.dataEdit.no_colveh;
      await this.callMarcas("all");
      this.mostrarFormulario = true;
      // this.$q.loading.hide();
    } else if (this.tipo == 1) {
      await this.callMarcas("all");
      this.mostrarFormulario = true;
      // this.$q.loading.hide();
    }
    // this.$q.loading.hide();
    // this.mostrarFormulario = true;
  },
};
</script>

<style scoped></style>
