<template>
  <div>
    <q-dialog
      persistent
      v-model="$store.state.personas.dialogCrear"
      position="top"
    >
      <!-- <q-dialog v-model="dialogCrear" persistent position="top"> -->
      <q-card v-if="mostrarFormulario">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3 text-grey-7"
            active-color="primary"
            indicator-color="purple"
            align="justify"
          >
            <q-tab name="mails" label="Persona Natural" />
            <q-tab name="alarms" label="Persona Juridica" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mails">
              <Natural @click="cerrarDialogCrearUser" />
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <Juridica />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["tipo", "info"],
  components: {
    Natural: () => import("./Natural.vue"),
    Juridica: () => import("./Juridica.vue")
  },
  computed: {
    ...mapState("usuarios", ["dialogCrear"])
  },
  name: "CrearUsuario",
  data() {
    return {
      greenModel: 42,
      dni: "",
      numeroruc: "",
      razonsocial: "",
      primernombre: "",
      segundonombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      numeroCelular: "",
      tab: "mails",
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
      username: "",
      password: "",
      nombres: "",
      ape_pat: "",
      ape_mat: ""
    };
  },
  methods: {
    ...mapActions("usuarios", ["callUsersAdd", "callUsers"]),
    cerrarDialogCrearUser() {
      this.$store.commit("usuarios/dialogCrear", false);
      this.mostrarFormulario = false;
    },
    async onResert() {
      this.username = "";
      this.password = "";
      this.dni = "";
      this.ape_pat = "";
      this.ape_mat = "";
      this.nombres = "";
    },
    async onSubmit(val) {
      console.log(val);
    },
    async onSubmit_(val) {
      console.log(val);
      this.loadboton = true;
      console.log("asdasdasd");
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
        const responseAddUser = await this.callUsersAdd({
          codigo: null,
          id: this.username,
          password: this.password,
          doc_ide: this.dni,
          ape_pat: this.ape_pat,
          ape_mat: this.ape_mat,
          nombres: this.nombres,
          swt_emp: true,
          swt_act: true
        });
        console.log("responseAddUser", responseAddUser);
        if (responseAddUser.res == "ok") {
          this.loadboton = false;
          this.onResert();
          this.$q.notify({
            message: responseAddUser.message
          });
          this.callUsers("all");
          this.$store.commit("usuarios/dialogCrear", false);
        } else if (responseAddUser.res == "ko") {
          this.loadboton = false;
          this.$q.notify({
            message: `${responseAddUser.user.detail} - verifique los campos`
          });
        }

        // this.q$.notify({
        //   message: responseAddUser
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
    // this.$q.loading.show();
    console.log("mounted - crear - personas");
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
      // await this.callMarcas("all");
      this.mostrarFormulario = true;
      // this.$q.loading.hide();
    } else if (this.tipo == 1) {
      // await this.callMarcas("all");
      this.mostrarFormulario = true;
      // this.$q.loading.hide();
    }
    // this.$q.loading.hide();
    // this.mostrarFormulario = true;
  }
};
</script>

<style scoped></style>
