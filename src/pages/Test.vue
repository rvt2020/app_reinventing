<template>
  <div>
    <Uploadbasic />
    <q-btn
      :loading="loadboton"
      class="full-width"
      @click="guardar"
      color="positive"
      label="Guardar"
    />
  </div>
</template>

<script>
import { storagelocal } from "../mixins/mixin";
import { mapActions } from "vuex";
export default {
  mixins: [storagelocal],
  components: {
    Uploadbasic: () => import("components/Upload/UploadBasic")
  },
  data() {
    return {
      loadboton: false,
      selected_file: "",
      check_if_document_upload: false,
      archivo: ""
    };
  },
  methods: {
    ...mapActions("usuarios", ["callCambioFotper", "callUsers"]),
    async guardar() {
      this.loadboton = true;
      console.log("this.archivo", this.archivo);
      if (this.$store.state.example.arcadj.length > 0) {
        this.callCambioFotper({
          id: this.userLocal.co_usuari,
          fot_per: this.$store.state.example.arcadj
        })
          .then(async resp => {
            console.log("resp", resp);
            await this.callUsers("all");
            this.$emit("click");
            this.loadboton = false;
          })
          .catch(error => {
            console.log("error", error);
            this.$emit("click");
            this.loadboton = false;
          });
      } else {
        this.$q.notify({
          message: "Debes subir una imagen antes de guardar"
        });
        this.loadboton = false;
      }
    },
  }
};
// Get archivo
// http://localhost:9500/fileserver/myfiles/getfile/0.jpg
</script>
