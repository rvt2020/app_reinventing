<template>
  <div>
    <!--    <q-dialog v-model="$store.state.vehiculos.dialogCrear" position="top">-->
    <q-dialog v-model="dialogEdit" persistent position="top">
      <q-card style="width: 700px; max-width: 80vw;">
        <!--        {{ info }}-->
        <q-card-section class="row items-center">
          <div>
            <div class="text-h5">Editar Vehiculos</div>
          </div>
        </q-card-section>
        <q-separator />
        <form @submit.prevent="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                dense
                ref="placa"
                filled
                v-model="placa"
                label="Placa"
                hint="Ingresa tu DNI"
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
              <q-select
                filled
                dense
                v-model="versioncar"
                :options="options"
                label="Version"
                hint="Ingresa tu Version"
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
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
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
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
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
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
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
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" @click="cerrarDialogCrearUser" outline
              >Cerrar
            </q-btn>
            <q-btn color="warning" type="reset" outline>reset</q-btn>
            <q-btn color="positive" type="submit" outline>Guardar</q-btn>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapState("vehiculos", ["dialogEdit"]),
    ...mapGetters("marcas", ["getMarcas"]),
    ...mapGetters("modelos", ["getModelosFilter", "getModelosFilterMarca"])
  },
  name: "EditVehiculos",
  data() {
    return {
      options: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.4"],
      placa: "",
      marca: "",
      modelo: "",
      versioncar: "",
      anio: "",
      color: "",
      chasis: "",
      motor: ""
    };
  },
  methods: {
    ...mapActions("vehiculos", [
      "callVehiculosAdd",
      "callVehiculos",
      "callVehiculosUpdate"
    ]),
    ...mapActions("marcas", ["callMarcas"]),
    ...mapActions("modelos", ["callModelosFilter", "callModelosFilterMarca"]),
    async traerModelos(val) {
      console.log("Buscando modelos");
      await this.callModelosFilterMarca(val);
    },
    cerrarDialogCrearUser() {
      this.$store.commit("vehiculos/dialogEdit", false);
    },
    async onResert() {
      this.placa = "";
      this.modelo = "";
      this.anio = "";
      this.chasis = "";
      this.motor = "";
      this.color = "";
    },
    async onSubmit() {
      this.$q.loading.show();
      console.log("UPDATEEEE VIHICULO");
      // this.$refs.username.validate();
      // this.$refs.dni.validate();
      // this.$refs.password.validate();
      // this.$refs.nombre.validate();
      // this.$refs.ape_pat.validate();
      // this.$refs.ape_mat.validate();
      //
      // if (
      //   this.$refs.username.hasError ||
      //   this.$refs.dni.hasError ||
      //   this.$refs.password.hasError
      // ) {
      //   this.formHasError = true;
      //   console.log("es un error");
      // } else {
      try {
        const responseAddUser = await this.callVehiculosUpdate({
          co_plaveh: this.placa,
          co_vehicu: this.info.co_vehicu,
          co_modveh: this.modelo,
          nu_anofab: this.anio,
          nu_serveh: this.chasis,
          nu_motveh: this.motor,
          no_colveh: this.color
        });
        console.log("responseAddUser", responseAddUser);
        if (responseAddUser.res === "ok") {
          // this.onResert();
          this.$q.notify({
            message: responseAddUser.message
          });
          this.callVehiculos("all");
          this.$store.commit("vehiculos/dialogEdit", false);
          this.$q.loading.hide();
        } else if (responseAddUser.res === "ko") {
          this.$q.notify({
            message: `${responseAddUser.message} - verifique los campos`
          });
          this.$q.loading.hide();
        }

        // this.q$.notify({
        //   message: responseAddUser
        // });
      } catch (e) {
        console.log(e);
        // this.onResert();
        this.$q.notify({
          message: "Error controlado"
        });
        console.log("se paso, en el excel");
      }
      // }
      this.$q.loading.hide();
    }
  },
  async mounted() {
    await this.callMarcas("all");
    console.log(this.info);
    this.placa = this.info.co_plaveh;
    this.marca = Number(this.info.co_marveh);
    this.modelo = Number(this.info.co_modveh);
    this.versioncar = "";
    this.anio = this.info.nu_anofab;
    this.color = this.info.no_colveh;
    this.chasis = this.info.nu_serveh;
    this.motor = this.info.nu_motveh;
    // co_marveh: "80"
    // co_modveh: "1011"
    // co_plaveh: "F3J632"
    // co_vehicu: 1002
    // co_verveh: "8"
    // no_colveh: "NEGRO"
    // no_marveh: "BYD"
    // no_modveh: "F3"
    // no_verveh: "GLI"
    // nu_anofab: "2013"
    // nu_anomod: "2013"
    // nu_asiveh: "5"
    // nu_motveh: "BYD473QD713300172"
    // nu_serveh: "LGXC16AF6D0073589"
  }
};
</script>

<style scoped></style>
